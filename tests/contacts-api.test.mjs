import assert from 'node:assert/strict'
import test from 'node:test'

const backendUrl = (process.env.ELO_E2E_BACKEND_URL ?? process.env.VITE_POCKETBASE_URL ?? '').replace(
  /\/$/,
  '',
)
const adminEmail = process.env.ELO_E2E_ADMIN_EMAIL ?? ''
const adminPassword = process.env.ELO_E2E_ADMIN_PASSWORD ?? ''

const contactsPath = '/api/collections/contacts/records'
const authPath = '/api/collections/users/auth-with-password'
const seedNames = ['Mariana Duarte', 'Carlos Menezes', 'Fernanda Lopes', 'Rafael Antunes']

async function request(path, { method = 'GET', token = '', body } = {}) {
  const response = await fetch(`${backendUrl}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  return { response, data }
}

function assertSuccess(result, operation) {
  assert.ok(
    result.response.ok,
    `${operation} falhou com HTTP ${result.response.status}: ${JSON.stringify(result.data)}`,
  )
}

async function authenticate() {
  const result = await request(authPath, {
    method: 'POST',
    body: { identity: adminEmail, password: adminPassword },
  })
  assertSuccess(result, 'Autenticação na collection users')
  assert.equal(typeof result.data?.token, 'string', 'A autenticação não retornou um token')
  assert.ok(result.data.token.length > 0, 'A autenticação retornou um token vazio')
  return result.data.token
}

async function listContacts(token = '') {
  const query = new URLSearchParams({ page: '1', perPage: '100', sort: '-created' })
  return request(`${contactsPath}?${query}`, { token })
}

async function readContact(id, token) {
  return request(`${contactsPath}/${id}`, { token })
}

async function assertStoredStatus(id, token, expectedStatus) {
  const result = await readContact(id, token)
  assertSuccess(result, `Leitura do contato após definir ${expectedStatus}`)
  assert.equal(result.data.status, expectedStatus)
}

async function verifySeedBaseline(token) {
  const result = await listContacts(token)
  assertSuccess(result, 'Listagem final dos contatos')

  const items = result.data?.items
  assert.ok(Array.isArray(items), 'A listagem final não retornou items')
  assert.equal(items.length, 4, 'A base deve conter somente os quatro contatos seed')
  assert.deepEqual(
    [...items.map((item) => item.name)].sort(),
    [...seedNames].sort(),
    'Os quatro contatos finais devem ser exatamente os seeds esperados',
  )

  const counters = items.reduce(
    (totals, item) => {
      assert.ok(item.status in totals, `Status inesperado na base final: ${item.status}`)
      totals[item.status] += 1
      return totals
    },
    { novo: 0, em_atendimento: 0, concluido: 0 },
  )

  assert.deepEqual(counters, { novo: 2, em_atendimento: 1, concluido: 1 })
}

test('fluxo principal da API do Canal de Comunicação ELO', async () => {
  assert.ok(backendUrl, 'Defina ELO_E2E_BACKEND_URL ou VITE_POCKETBASE_URL para o teste E2E')
  assert.ok(adminEmail, 'Defina ELO_E2E_ADMIN_EMAIL para o teste E2E')
  assert.ok(adminPassword, 'Defina ELO_E2E_ADMIN_PASSWORD para o teste E2E')

  const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const submittedContact = {
    name: `Validação E2E ELO ${runId}`,
    contact: `elo-e2e-${runId}@example.com`,
    need: 'Validar o recebimento e o acompanhamento de um contato pelo canal institucional.',
    status: 'novo',
  }

  let createdId = ''
  let token = ''
  const failures = []

  try {
    const creation = await request(contactsPath, { method: 'POST', body: submittedContact })
    assertSuccess(creation, 'Criação pública do contato')
    createdId = creation.data?.id ?? ''
    assert.ok(createdId, 'A criação pública não retornou o id do contato')
    assert.equal(creation.data.name, submittedContact.name)
    assert.equal(creation.data.contact, submittedContact.contact)
    assert.equal(creation.data.need, submittedContact.need)
    assert.equal(creation.data.status, 'novo')

    const anonymousList = await listContacts()
    if (anonymousList.response.ok) {
      assert.ok(Array.isArray(anonymousList.data?.items), 'A resposta anônima não contém items')
      assert.equal(
        anonymousList.data.items.length,
        0,
        'A regra de listagem anônima não pode expor nenhum contato',
      )
      assert.equal(
        anonymousList.data.items.some((item) => item.id === createdId),
        false,
        'O contato criado não pode aparecer sem autenticação',
      )
    } else {
      assert.ok(
        [401, 403].includes(anonymousList.response.status),
        `A listagem anônima deveria ser negada, mas retornou HTTP ${anonymousList.response.status}`,
      )
    }

    token = await authenticate()
    const authenticatedList = await listContacts(token)
    assertSuccess(authenticatedList, 'Listagem autenticada dos contatos')
    assert.ok(Array.isArray(authenticatedList.data?.items), 'A listagem autenticada não contém items')
    assert.equal(authenticatedList.data.items[0]?.id, createdId, 'O contato mais recente não veio no topo')
    assert.equal(authenticatedList.data.items[0]?.status, 'novo')

    const attending = await request(`${contactsPath}/${createdId}`, {
      method: 'PATCH',
      token,
      body: { status: 'em_atendimento' },
    })
    assertSuccess(attending, 'Mudança de status para em_atendimento')
    assert.equal(attending.data.status, 'em_atendimento')
    await assertStoredStatus(createdId, token, 'em_atendimento')

    const completed = await request(`${contactsPath}/${createdId}`, {
      method: 'PATCH',
      token,
      body: { status: 'concluido' },
    })
    assertSuccess(completed, 'Mudança de status para concluido')
    assert.equal(completed.data.status, 'concluido')
    await assertStoredStatus(createdId, token, 'concluido')
  } catch (error) {
    failures.push(error)
  } finally {
    if (createdId) {
      try {
        token ||= await authenticate()
        const deletion = await request(`${contactsPath}/${createdId}`, { method: 'DELETE', token })
        assertSuccess(deletion, 'Exclusão do contato de validação')

        const deletedRead = await readContact(createdId, token)
        assert.equal(deletedRead.response.status, 404, 'O contato de validação ainda existe após o DELETE')
      } catch (error) {
        failures.push(error)
      }
    }

    try {
      token ||= await authenticate()
      await verifySeedBaseline(token)
    } catch (error) {
      failures.push(error)
    }
  }

  if (failures.length === 1) {
    throw failures[0]
  }
  if (failures.length > 1) {
    throw new AggregateError(failures, 'O fluxo E2E e/ou sua limpeza falharam')
  }
})
