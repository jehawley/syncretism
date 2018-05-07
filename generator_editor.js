var editor_db = require('./editor_db');
var pgp = require('pg-promise')();
var db = pgp({
  host: 'localhost',
  user: 'syncretism_admin',
  database: 'syncretism'
});

var generatorEditor = {
  loadCharacters: function() {
    return editor_db.loadCharacters(db)
    .then(characterData => {
      return {
        characters: characterData
      };
    })
    .catch(error => {
      console.log(error);
    });
  },

  loadHeaders: function() {
    return editor_db.loadHeaders(db)
    .then(headerData => {
      return {
        headers: headerData
      };
    })
    .catch(error => {
      console.log(error);
    });
  },

  loadCharacterDetails: function(character_id) {

  },

  loadHeaderDetails: function(header_id) {

  }
};

module.exports = generatorEditor;
