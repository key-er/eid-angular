angular.module('app')
.service('dictServices', function($http) {
  this.getWordDetail = function(word, callback) {
    // some ajax request using $http.get('/items')
    // let mockdata = {
    //   word: 'happy',
    //   synonyms:
    //    [ 'contented',
    //      'content',
    //      'cheerful',
    //      'cheery',
    //      'merry',
    //      'joyful',
    //      'jovial',
    //      'jolly',
    //      'joking',
    //      'jocular'],
    //   antonyms: [ 'sad' ],
    //   examples: [ 'Melissa came in looking happy and excited' ]
    // }
    // callback(null, mockdata)

    $http.post('/word/', {'word': word})
      .then(
        (response) => {
          // debugger;
          callback(null, response.data)
          console.log('A successful get request');
      },

       (err) => {
        callback(err, null)
        console.log('A failed get request');
      })


    $http.get(`/word/${word}`)
      .then(
        (response) => {
          // debugger;
          callback(null, response.data)
          console.log('A successful get request');
      },

       (err) => {
        callback(err, null)
        console.log('A failed get request');
      })

  };

  this.getSearchHistory = (date, callback) => {
    let mockdata = ['word1', 'word2', 'word3', 'word4'];
    // callback(null, mockdata)

    let fdate = date.split('T')[0] //"2018-06-12T07:00:00.000Z".split('T')
    getHistory(fdate)
    .then((response) => {
      if (response.data.length > 0) {
        let words = response.data.map(function(item) { return item["word"] })
        callback(null, words)
      }
    })
    .catch((err) => {
      callback(err, null)
    })
  };


  var getHistory = function(date) {
    return new Promise(function(resolve, reject) {
      $http.get(`/word/${date}`)
      .then(
        (response) => {
          resolve(response)
      },
       (err) => {
        reject(err)
      })
    })
  }

})