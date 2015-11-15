// Load dependencies
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

// Load project scripts
var api = require('./routes/api')
var get = require('./routes/get')
var settings = require('./settings/settings')

// Configure express application
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configure routing
app.use('/web', express.static(__dirname + '/static/web'))
app.use('/api', api)
app.use('/', get)

// Start server
var server = app.listen(settings.port, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
