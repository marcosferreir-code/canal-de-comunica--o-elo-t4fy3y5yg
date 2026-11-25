migrate(
  (app) => {
    if (app.countRecords('contacts') > 0) {
      return
    }

    const collection = app.findCollectionByNameOrId('contacts')
    const contacts = [
      {
        name: 'Mariana Duarte',
        contact: 'mariana.duarte@email.com',
        need: 'Gostaria de saber como inscrevo minha equipe na próxima convocação.',
        status: 'novo',
      },
      {
        name: 'Carlos Menezes',
        contact: '(11) 98812-4477',
        need: 'Sugestão: incluir um aviso semanal por e-mail.',
        status: 'em_atendimento',
      },
      {
        name: 'Fernanda Lopes',
        contact: 'fernanda.lopes@email.com',
        need: 'Preciso falar sobre a eleição dos representantes.',
        status: 'concluido',
      },
      {
        name: 'Rafael Antunes',
        contact: 'rafael.a@email.com',
        need: 'Quero receber os avisos da Fundação.',
        status: 'novo',
      },
    ]

    for (const item of contacts) {
      const record = new Record(collection)
      record.set('name', item.name)
      record.set('contact', item.contact)
      record.set('need', item.need)
      record.set('status', item.status)
      app.save(record)
    }
  },
  (app) => {
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
