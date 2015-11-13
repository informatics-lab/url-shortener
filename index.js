var express = require('express')
var app = express();
var bodyParser = require('body-parser')

var api = require('./src/api')
var get = require('./src/get')
var settings = require('./src/settings')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api);
app.use('/', get);

var port = settings.port

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
