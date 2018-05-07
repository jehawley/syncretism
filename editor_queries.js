var pgp = require('pg-promise')();
var QueryFile = pgp.QueryFile

function load(file) {
  var path = './sql/editor/';
  var config = {
    minify: false
  };
  return new QueryFile(path + file, config);
}

var sqlQueries = {
  loadHeaders: load('loadHeaders.sql'),
  loadCharacters: load('loadCharacters.sql')
};

module.exports = sqlQueries;
