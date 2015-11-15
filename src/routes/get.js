var express = require('express')
var router = express.Router()

var db = require('../models/database.js')

router.get('/', function (req, res) {
  res.redirect(301, "/web")
});

router.get('/unknown/:short', function (req, res) {
  message = "Error: Unknown short code '" + req.params.short + "'"
  res.status(404)
  res.render('pages/404', {"message" : message})
  console.log(message)
});

router.get('/:short', function (req, res) {
  db.get(req.params.short, function(url){
    if (url){
      console.log("code " + req.params.short + " -> " + url)
      res.redirect(301, url.url)
    } else {
      res.redirect(301, "/unknown/" + req.params.short)
    }
  })

});

module.exports = router
