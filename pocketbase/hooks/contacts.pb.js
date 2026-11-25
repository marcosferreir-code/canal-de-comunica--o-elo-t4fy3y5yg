onRecordCreateRequest((event) => {
  // Toda criação pública começa na fila de novos contatos.
  event.record.set('status', 'novo')
  event.next()
}, 'contacts')
