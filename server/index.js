var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var db = require('../database-mysql');
 var db = require('../database-mongo');

const api = require('../helpers/oxfordAPI.js')
const utils = require('../helpers/utils.js')
var query = utils.query;


var app = express();


/// Middleware for parsing request body
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));
// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));


// post seems extra, as the data is not sensitive we can simply send in get
app.post('/word', function(req, res) {
  console.log('******* in ANGULAR - POST ***** ', req.body.word)
  // check db first
  query({word:req.body.word})
  .then((matchedDoc) => res.status(200).send(matchedDoc[0]))
  .catch((err) => {
    if (err !== 'not found') res.status(503).send('sever internal error')
    // not found in db, call API now
    if (err === 'not found') {
      api.searchLexicon(req.body.word, (err, data) => {
        if (err) res.status(404).send()
        else {
          console.log('saving in db')
          console.log(data)
          db.save(data)
          res.status(200).send(data)
        }
      });
    }
  })
})


// same thing as above but with get
app.get('/word/:word(\\D+)/', (req, res) => {
 const word = req.params.word
 console.log('you hit ANGULAR GET with word', word )
 console.log(req.params) // req.params = {word: <regexmatch>}
 query(req.params)
 .then((matchedDoc) => res.status(200).send(matchedDoc[0]))
 .catch((err) => {
  if (err === 'not found') {
    api.searchLexicon(word, (err, data) => {
      if (err) res.status(404).send()
      else {
        console.log('saving in db')
        console.log(data)
        db.save(data)
        res.status(200).send(data)
      }
    })
  }
  else res.status(503).send('sever internal error')
 })
})


// to handle dates
app.get('/word/:from[0-9\-]{0}/', function (req, res) {
  console.log('came in ANGULAR DATE get')
  //// WORK needs to be done here
  /// need to change req.params to include username
  console.log(req.params)
  var dateObj = new Date(req.params.from.split('-').join(','))
  query({'createdAt': {"$gte": dateObj}})
  .then((matchedDoc) => {
    console.log("matchedDoc is")
    console.log(matchedDoc)
    res.status(200).send(matchedDoc)
  })
  .catch((err) => res.status(404).send(err))

});




let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

