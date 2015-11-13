var express = require('express')
var router = express.Router()

var db = require('./database.js')

router.get('/', function (req, res) {
  res.send("Hello")
});

router.get('/unknown/:short', function (req, res) {
  message = "Unknown short code " + req.params.short
  res.send(message)
  console.log(message)
});

router.get('/:short', function (req, res) {
  db.get(req.params.short, function(url){
    if (url){
      console.log("code " + req.params.short + " -> " + url)
      res.redirect(301, url.url)
    } else {
      res.send("unknown")
    }
  })

});

module.exports = router
