const mongoose = require('mongoose')
const connection = mongoose.connection;


const MONGODB_URI = process.env.DB_URI  || 'mongodb://localhost/angular'
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});




var lexiconSchema = mongoose.Schema({
  word: {type: String, unique: true},
  username: String,
  antonyms: [],
  synonyms: [],
  examples: [],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

var Thesaurus = mongoose.model('Thesaurus', lexiconSchema);

let save = function(document, cb) {
  // console.log('IN DB SAVE FUNC', document)
  // save only words that are found in remote API dict
  if (document) {
    Thesaurus.create(document, (err, res) => {
      if (cb) cb(err, res)
    })
  }
}

let query = function(query, cb) {
  return Thesaurus.find(query)
}


let removeOne = function(query, cb) {
  Thesaurus.findOneAndRemove(query, cb)
}



module.exports.save = save;
module.exports.query = query
module.exports.removeOne = removeOne;
module.exports.connection = connection;





