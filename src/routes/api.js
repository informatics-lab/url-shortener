var express = require('express')
var router = express.Router()

var db = require('../models/database')
var settings = require('../settings/settings')
db.connect()

var build_response = function(status, message, result){
  return {
    "status" : status,
    "message" : message,
    "result" : result
  }
}

var respond = function(res, data){
  res.setHeader('Content-Type', 'application/json')
  res.status(data.status)
  res.send(JSON.stringify(data))
}

router.get('/', function (req, res) {
  var data = build_response(200, "Welcome to the API", null)
  respond(res, data)
});

router.get('/check/:short', function (req, res) {
  db.check_short(req.params.short, function(err, url){
    if (url){
      url.domain = settings.domain
      var data = build_response(200, "Short exists", url)
    } else {
      var data = build_response(404, "Short not found", null)
    }
    respond(res, data)
  })
});

router.post('/create', function (req, res) {
  if (req.body.url === undefined){
    var data = build_response(400, "Missing url", null)
  } else {
    db.create(req.body.url, req.body.short, function(err, creation){
      if (creation) {
        var data = build_response(201, "Success!", {"url" : creation.url, "short" : creation.short})
      } else {
        var data = build_response(400, "Failed to create", null)
      }
      respond(res, data)
    })
  }
});

module.exports = router
