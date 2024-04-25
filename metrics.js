const client = require('prom-client')


exports.http_requests = new client.Counter({
    name: 'backend_http_requests',
    labelNames: ['code' , 'path'],
    help: 'this counter is used to track http requests sent to the backend'
  })