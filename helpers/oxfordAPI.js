const request = require('request');
const utils = require('./utils.js')
// const config = require('../configs.js')
try {
  const config = require('../config.js')
}

catch(e) {
  config = {
    'APP_ID': process.env.APP_ID,
    'APP_KEY': process.env.APP_KEY
  }
}

function searchLexicon(word, cb) {

  let options = {
    url: `https://od-api.oxforddictionaries.com/api/v1/entries/en/${word}/synonyms;antonyms`,
    headers: {
        'User-Agent': 'request',
        'app_id': config.APP_ID,
        'app_key': config.APP_KEY,
      }
  }

  request(options, function(err, res, body) {
    console.log('res***********************' )
    console.log(res.statusCode)
    if (err || res.statusCode === 404) cb(err, null)
    else if(res.statusCode === 200){
       cb(null, utils.parseData(body))
       // cb(null, body)
    }
  });
}

module.exports.searchLexicon = searchLexicon;
