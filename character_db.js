var character_queries = require('./character_queries');

var characterDb = {
  loadCharactersForPlayer: function(db, player_id) {
    return db.any({
      name: 'loadCharactersForPlayer',
      text: character_queries.loadCharactersForPlayer,
      values: [player_id, player_id]
    });
  },

  createCharacter: function(db, player_id, name, race, culture) {
    return db.one({
      name: 'createCharacter',
      text: character_queries.createCharacter,
      values: [player_id, name, race, culture]
    });
  },

  insertDefaultNewExperience: function(db, character_id, type, amount) {
    return db.none({
      name: 'insertDefaultNewExperience',
      text: character_queries.insertDefaultNewExperience,
      values: [character_id, type, amount]
    });
  },

  loadCharacterInfo: function(db, character_id) {
    return db.one({
      name: 'loadCharacterInfo',
      text: character_queries.loadCharacterInfo,
      values: [character_id, character_id]
    });
  },

  loadPurchasedHeaders: function(db, character_id) {
    return db.any({
      name: 'loadPurchasedHeaders',
      text: character_queries.loadPurchasedHeaders,
      values: [character_id]
    });
  }, 

  loadPurchasedSkills: function(db, character_id) {
    return db.any({
      name: 'loadPurchasedSkills',
      text: character_queries.loadPurchasedSkills,
      values: [character_id]
    });
  },

  loadHeaders: function(db, character_id) {
    return db.any({
      name: 'loadHeaders',
      text: character_queries.loadHeaders,
      values: [character_id]
    });
  },

  loadHeaderPrereqs: function(db, character_id) {
    return db.any({
      name: 'loadHeaderPrereqs',
      text: character_queries.loadHeaderPrereqs,
      values: [character_id]
    });
  },

  loadSkills: function(db, character_id) {
    return db.any({
      name: 'loadSkills',
      text: character_queries.loadSkills,
      values: [character_id]
    });
  },

  saveCharacterInfo: function(db, name, race, culture, character_id) {
    return db.none({
      name: 'saveCharacterInfo',
      text: character_queries.saveCharacterInfo,
      values: [name, race, culture, character_id]
    });
  },

  addPurchasedHeader: function(db, header_id, character_id) {
    return db.none({
      name: 'addPurchasedHeader',
      text: character_queries.addPurchasedHeader,
      values: [header_id, character_id]
    });
  }, 

  deletePurchasedHeaders: function(db, character_id) {
    return db.none({
      name: 'deletePurchasedHeaders',
      text: character_queries.deletePurchasedHeaders,
      values: [character_id]
    });
  },

  addPurchasedSkill: function(db, skill_id, character_id, type, level) {
    return db.none({
      name: 'addPurchasedSkill',
      text: character_queries.addPurchasedSkill,
      values: [skill_id, character_id, type, level]
    });
  },

  deletePurchasedSkills: function(db, character_id) {
    return db.none({
      name: 'deletePurchasedSkills',
      text: character_queries.deletePurchasedSkills,
      values: [character_id]
    });
  } 
};

module.exports = characterDb;
