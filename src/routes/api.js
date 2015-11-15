var express = require('express')
var router = express.Router()

var db = require('../models/database')
var settings = require('../settings/settings')
db.connect()

router.get('/', function (req, res) {
  data = {
    "status" : 200,
    "result" : {
      "message" : "Welcome to the API"
    }
  }

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(data))
});

router.get('/check/:short', function (req, res) {
  db.check_short(req.params.short, function(err, url){
    if (url){
      url.domain = settings.domain
      var data = {
        "status" : 200,
        "result" : url
      }
    } else {
      var data = {
        "status" : 404,
        "result" : {
          "message" : "Short not found"
        }
      }
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(data))
  })
});

router.post('/create', function (req, res) {
  if (req.body.url === undefined){
    res.status(400)
    var data = {
        "status" : 400,
        "result" : {
          "message" : "Missing url"
        }
      }
  } else {
    db.create(req.body.url, req.body.short, function(err, creation){
      if (creation) {
        var data = {
            "status" : 201,
            "result" : {
              "message": "Success!",
              "url" : creation.url,
              "short" : creation.short
            }
          }
      } else {
        res.status(400)
        var data = {
            "status" : 400,
            "result" : {
              "message" : "Failed to create"
            }
          }
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(data))
    })
  }
});

module.exports = router
