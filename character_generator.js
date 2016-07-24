var character_db = require('./character_db');
// TODO(jhawley): Is this even the right place for this? Or still db as param?
var pgp = require('pg-promise')();
var db = pgp({
  host: 'localhost',
  user: 'syncretism_admin',
  database: 'syncretism'
});

var expandCost = function(costParams) {
  return costParams.split(';').unshift(0);
}

// TODO(jhawley): Helper functions?
// TODO(jhawley): Immutable-js to avoid parameter mutation?
var characterGenerator = {
  loadInitialGeneratorState: function(character_id) {
    return db.task(t => {
      return character_db.loadCharacterInfo(t, character_id)
      .then(characterData => {
        return character_db.loadHeaders(t, character_id)
        .then(headerData => {
          var headers = headerData.reduce((headerCollection, header) => {
            headerCollection[header.id] = {
              name: header.name,
              cost: header.cost,
              group: header.header_group,
              skills: {},
              prerequisites: []
            };
            return headerCollection;
          }, {});

          return {
            characterData: characterData,
            headers: headers,
            purchasedHeaders: [],
            purchasedSkills: {}
          };
        });
      })
      .then(data => {
        return character_db.loadHeaderPrereqs(t, character_id)
        .then(headerPrereqData => {
          headerPrereqData.forEach(prereq => {
            var header = data.headers[prereq.header_id];
            if (header) {
              header.prerequisites.push(prereq.prereq_header_id); 
            }
          });
          return data;
        });
      })
      .then(data => {
        return character_db.loadSkills(t, character_id)
        .then(skillData => {
          var skills = skillData.reduce((skillCollection, skill) => {
            if (!skillCollection[skill.id]) {
              skillCollection[skill.id] = {
                name: skill.name,
                description: skill.description,
                cost: {}
              };
            }

            skillCollection[skill.id][skill.cost_type] = expandCost(skill.params);

            return skillCollection;
          }, {});

          Object.keys(skills).forEach(skill_id => {
            var skill = skills[skill_id];
            var header = data.headers[skill.header_id];
            if (header) {
              header.skills[skill_id] = skill;
            }
          });

          return data;
        });
      })
      .then(data => {
        return character_db.loadPurchasedHeaders(t, character_id)
        .then(purchasedHeaderData => {
          data.purchasedHeaders = purchasedHeaderData.map(({header_id: header_id}) => header_id);
          return data;
        });
      })
      .then(data => {
        return character_db.loadPurchasedSkills(t, character_id)
        .then(purchasedSkillData => {
          var purchasedSkills = purchasedSkillData.reduce((skillCollection, skill) => {
            if (!skillCollection[skill.id]) {
              skillCollection[skill.id] = {};
            }
            skillCollection[skill.id][skill.type] = skill.level;
            return skillCollection;
          }, {});

          data.purchasedSkills = purchasedSkills;
          return data;
        });
      });
    })
    .then(data => {
      // TODO(jhawley): Verify that data has the expected shape, otherwise throw
      return data;
    })
    .catch(error => {
      // TODO(jhawley): Errors. Gotta catch 'em all.
      // TODO(jhawley): Also consider what to return in the case of an error
      console.log(error);
    });    
  },

  saveGeneratorState: function(player_id, character_info, purchased_headers, purchased_skills) {
    return db.tx(tx => {
      return character_db.saveCharacterInfo(tx,
                                            character_info.name, 
                                            character_info.race,
                                            character_info.culture,
                                            character_info.character_id,
                                            player_id)
      .then(result => {
        return character_db.deletePurchasedHeaders(tx, character_info.character_id);
      })
      .then(result => {
        return Promise.all(purchased_headers.map(header_id => {
          return character_db.addPurchasedHeder(tx, header_id, character_info.character_id);
        }));
      })
      .then(result => {
        return character_db.deletePurchasedSkills(tx, character_info.character_id);
      })
      .then(result => {
        return Promise.all(Object.keys(purchased_skills).map(skill_id => {
          var skill = purchased_skill[skill_id];
          return Promise.all(Object.keys(skill).map(type => {
            return character_db.addPurchasedSkill(tx, skill_id, character_info.character_id, type, level);
          }));
        }));
      });
    })
    .then(data => {
      // TODO(jhawley): Success, somehow?
    })
    .catch(error => {
      // TODO(jhawley): Errors. Catch them.      
    });
  }
};

module.exports = characterGenerator; 
