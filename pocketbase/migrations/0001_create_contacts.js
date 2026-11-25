migrate(
  (app) => {
    const collection = new Collection({
      name: 'contacts',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'contact', type: 'text', required: true },
        { name: 'need', type: 'text', required: true },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['novo', 'em_atendimento', 'concluido'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_contacts_status ON contacts (status)',
        'CREATE INDEX idx_contacts_created ON contacts (created)',
      ],
    })

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('contacts')
    app.delete(collection)
  },
)
