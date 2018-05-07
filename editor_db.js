var editor_queries = require('./editor_queries');

// TODO(jhawley): Prepared statement names should be globally unique somehow
var editorDb = {
  loadCharacters: function(db) {
    return db.any({
      name: 'loadCharacters',
      text: editor_queries.loadCharacters,
      values: []
    });
  },

  loadHeaders: function(db) {
    return db.any({
      name: 'loadAllHeaders',
      text: editor_queries.loadHeaders,
      values: []
    });
  }
};

module.exports = editorDb;
