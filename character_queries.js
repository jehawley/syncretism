var pgp = require('pg-promise')();
var QueryFile = pgp.QueryFile

function load(file) {
  var path = './sql/character_generator/';
  var config = {
    minify: false
  };
  return new QueryFile(path + file, config);
}

var sqlQueries = {
  loadCharactersForPlayer: load('loadCharactersForPlayer.sql'),
  loadCharacterInfo: load('loadCharacterInfo.sql'),
  loadPurchasedHeaders: load('loadPurchasedHeaders.sql'),
  loadPurchasedSkills: load('loadPurchasedSkills.sql'),
  loadHeaders: load('loadHeaders.sql'),
  loadHeaderPrereqs: load('loadHeaderPrereqs.sql'),
  loadSkills: load('loadSkills.sql'),
  saveCharacterInfo: load('saveCharacterInfo.sql'),
  addPurchasedHeader: load('addPurchasedHeader.sql'),
  deletePurchasedHeaders: load('deletePurchasedHeaders.sql'),
  addPurchasedSkill: load('addPurchasedSkill.sql'),
  deletePurchasedSkills: load('deletePurchasedSkills.sql')
};

module.exports = sqlQueries;
