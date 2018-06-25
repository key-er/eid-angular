var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'FILL_ME_IN',
//   database : 'test'
// });

// var selectAll = function(callback) {
//   connection.query('SELECT * FROM items', function(err, results, fields) {
//     if(err) {
//       callback(err, null);
//     } else {
//       // mock data
//       results = [2,1,2,1,200, 900]
//       callback(null, results);
//     }
//   });
// };




var selectAll = function(callback) {
  callback(null, mockD)
}
module.exports.selectAll = selectAll;
