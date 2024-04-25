const client = require('prom-client')

client.register.metrics().then((str)=>console.log(str))