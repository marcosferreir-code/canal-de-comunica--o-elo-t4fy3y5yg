// Reposicionamento: contatos de demonstração com o enquadramento de pré-cadastro
// (manifestação de interesse na fundação da ELO). Idempotente: atualiza o seed
// existente pelo nome ou cria o que falta.
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('contacts')
    const seeds = [
      {
        name: 'Mariana Duarte',
        contact: 'mariana.duarte@email.com',
        need: 'Sou servidora da Câmara de Blumenau e quero me pré-cadastrar para participar da fundação da ELO.',
        status: 'novo',
      },
      {
        name: 'Carlos Menezes',
        contact: '(48) 98812-4477',
        need: 'Sou servidor legislativo em Florianópolis e quero manifestar interesse em integrar a mobilização da fundação.',
        status: 'em_atendimento',
      },
      {
        name: 'Fernanda Lopes',
        contact: 'fernanda.lopes@email.com',
        need: 'Cheguei ao canal por indicação de um colega de câmara e quero entender como participar da fundação da ELO.',
        status: 'concluido',
      },
      {
        name: 'Rafael Antunes',
        contact: 'rafael.a@email.com',
        need: 'Recebi o QR Code na assembleia do Legislativo e quero fazer meu pré-cadastro como apoiador da fundação.',
        status: 'novo',
      },
    ]

    for (const item of seeds) {
      const existing = app.findRecordsByFilter('contacts', 'name = {:name}', '', 1, 0, {
        name: item.name,
      })
      if (existing.length > 0) {
        // Reflete o novo enquadramento em registros de demonstração já existentes.
        existing[0].set('name', item.name)
        existing[0].set('contact', item.contact)
        existing[0].set('need', item.need)
        app.save(existing[0])
        continue
      }
      const record = new Record(collection)
      record.set('name', item.name)
      record.set('contact', item.contact)
      record.set('need', item.need)
      record.set('status', item.status)
      app.save(record)
    }
  },
  (app) => {
    // Down: remove apenas os seeds de demonstração (identificados pelo nome).
    const names = ['Mariana Duarte', 'Carlos Menezes', 'Fernanda Lopes', 'Rafael Antunes']
    for (const name of names) {
      const records = app.findRecordsByFilter('contacts', 'name = {:name}', '', 50, 0, {
        name: name,
      })
      for (const record of records) {
        app.delete(record)
      }
    }
  },
)
