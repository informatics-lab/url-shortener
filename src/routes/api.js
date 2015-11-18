// Load dependencies
var express = require('express')
var router = express.Router()

// Load project scripts
var db = require('../models/database')
var settings = require('../settings/settings')

// Connect to database
db.connect()

// Utility functions
var build_response = function(status, message, result){
  return {
    "status" : status,
    "message" : message,
    "result" : result
  }
}

var respond = function(res, data){
  console.log(data)
  res.setHeader('Content-Type', 'application/json')
  res.status(data.status)
  res.send(JSON.stringify(data))
}

// Start routing
router.get('/', function (req, res) {
  var data = build_response(200, "Welcome to the API", null)
  respond(res, data)
})

router.get('/check/:short', function (req, res) {
  db.check_short(req.params.short, function(err, url){
    if (url){
      var data = build_response(200, "Short exists", {"url": url.url, "short": url.short, "baseurl": settings.getBaseURL()})
    } else {
      var data = build_response(404, "Short not found", null)
    }
    respond(res, data)
  })
})

router.post('/create', function (req, res) {
  console.log(req.body.url)
  if (req.body.url === undefined){
    console.log("Missing url")
    var data = build_response(400, "Missing url", null)
    respond(res, data)
  } else {
    console.log("Creating url")
    db.create(req.body.url, req.body.short, function(err, creation){
      console.log("DB request made")
      if (creation) {
        console.log("Success, short created!")
        var data = build_response(201, "Success, short created!", {"url" : creation.url, "short" : creation.short, "baseurl": settings.getBaseURL()})
      } else {
        console.log("Failed to create")
        var data = build_response(400, "Failed to create: " + err, null)
        console.log(data)
      }
      respond(res, data)
    })
  }
})

router.get('/genshort', function (req, res) {
  var short = db.generate_short()
  var data = build_response(200, "Generated", {"short": short, "baseurl": settings.getBaseURL()})
  respond(res, data)
})

// Export router object for use in express
module.exports = router
