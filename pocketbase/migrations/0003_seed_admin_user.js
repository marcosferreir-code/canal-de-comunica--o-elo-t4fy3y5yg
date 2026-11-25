migrate(
  (app) => {
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'm_acf@hotmail.com')
      return
    } catch (_) {}

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    const record = new Record(users)
    record.setEmail('m_acf@hotmail.com')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Administração ELO')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'm_acf@hotmail.com')
      app.delete(record)
    } catch (_) {}
  },
)
