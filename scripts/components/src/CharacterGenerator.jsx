define(['components/compiled/CharacterInfo', 'components/compiled/CharacterSkills'], function(CharacterInfo, CharacterSkills) {
  var CharacterGenerator = React.createClass({
    propTypes: {
      characterId: React.PropTypes.number,
      headers: React.PropTypes.object,
      characterData: React.PropTypes.object,
      purchasedHeaders: React.PropTypes.arrayOf(React.PropTypes.number),
      purchasedSkills: React.PropTypes.object
    },

    getInitialState: function() {
      var purchasedHeaders = this.props.purchasedHeaders.reduce(function(headers, header) {
        headers[header] = true;
        return headers;
      }, {});
  
      return ({
        characterName: this.props.characterData.name,
        race: this.props.characterData.race,
        culture: this.props.characterData.culture,
        purchasedHeaders: purchasedHeaders,
        purchasedSkills: this.props.purchasedSkills
      });
    },
  
    componentWillReceiveProps: function(nextProps) {
      // TODO(jhawley): Make this do what getInitialState does?
      // TODO(jhawley): But perhaps not exactly? (Do a comparison to see if anything needs to change?)
      // TODO(jhawley): Or rethink how this works entirely?
    },
  
    computeCanBuy: function(headerId) {
      var prereqsSatisfied = (this.props.headers[headerId].prerequisites || []).every(function(prereq) {
        return this.state.purchasedHeaders[prereq];
      }.bind(this));
      return prereqsSatisfied;
    },
  
    computeCanSell: function(headerId) {
      // TODO(jhawley): do things
      return false;
    },
  
    computePrerequisitesSatisfied: function(headerId) {
      var prereqs = {};
      (this.props.headers[headerId].prerequisites || []).forEach(function(prereq) {
        var prereqName = this.props.headers[prereq].name;
        prereqs[prereqName] = {satisfied: this.state.purchasedHeaders[prereq] ? true : false};
      }.bind(this));
      return prereqs;
    },
  
    generateBuyHeaderCallback: function(headerId) {
      return function(newPurchased) {
        this.setState(function(previousState, currentProps) {
          var purchasedHeaders = {};
          // Copy the old state
          Object.keys(previousState.purchasedHeaders).forEach(function(id) {
            purchasedHeaders[id] = true;
          });
  
          if (newPurchased) {
            purchasedHeaders[headerId] = true;
          } else {
            delete purchasedHeaders[headerId];
          }
  
          return {'purchasedHeaders': purchasedHeaders};
        });
      }.bind(this);
    },
  
    // TODO(jhawley): Can I clean this up at all?
    // TODO(jhawley): Broken?
    generateBuySkillCallback: function(skillId, purchaseType) {
      return function(newLevel) {
        this.setState(function (previousState, currentProps) {
          var newPurchasedSkills = Object.keys(previousState.purchasedSkills).reduce(function(skills, oldSkillId) {
            skills[oldSkillId] = previousState.purchasedSkills[oldSkillId]
            return skills;
          }, {});

          if (newLevel > 0) {
            newPurchasedSkills[skillId] = Object.keys(newPurchasedSkills[skillId] || {}).reduce(function(types, type) {
              types[type] = newPurchasedSkills[skillId][type];
              return types;
            }, {});
            newPurchasedSkills[skillId][purchaseType] = newLevel;
          } else {
            var purchasedSkill = newPurchasedSkills[skillId];
            if (purchasedSkill) {
              if (purchasedSkill[purchaseType]) {
                delete purchasedSkill[purchaseType];
              }
            }
          }

          return {'purchasedSkills': newPurchasedSkills};
        });
      }.bind(this);
    },
  
    updateCharacterName: function(name) {
      this.setState({"characterName": name});
    },
  
    updateRace: function(race) {
      this.setState({"race": race});
    },
  
    updateCulture: function(culture) {
      this.setState({"culture": culture});
    },
  
    saveCharacter: function() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/saveCharacter');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log('Saved!\n');
        } else {
          console.log('Not Saved\n');
        }
      }

      var requestParams = {
        characterId: this.props.characterId,
        characterInfo: {
          name: this.state.characterName,
          race: this.state.race,
          culture: this.state.culture
        },
        purchasedHeaders: Object.keys(this.state.purchasedHeaders),
        purchasedSkills: this.state.purchasedSkills
      };

      xhr.send(JSON.stringify(requestParams));
    },
  
    computeSpentXP: function() {
      return Object.keys(this.state.purchasedHeaders).reduce(function(totalCost, headerId) {
        var header = this.props.headers[headerId];
        return header ? totalCost + header.cost : 0;
      }.bind(this), 0);
    },

    findSkillInHeader: function(searchSkillId) {
      for (var headerId in this.props.headers) {
        for (var skillId in this.props.headers[headerId].skills) {
          if (skillId === searchSkillId) {
            return this.props.headers[headerId].skills[skillId];
          }
        }
      }
    },
  
    computeSpentCP: function() {
      return Object.keys(this.state.purchasedSkills).reduce(function(totalCost, skillId) {
        var purchasedSkill = this.state.purchasedSkills[skillId];
        var skill = this.findSkillInHeader(skillId);
        if (skill) {
          return totalCost + Object.keys(purchasedSkill).reduce(function(totalSkillCost, type) {
            return totalSkillCost + skill.cost[type][purchasedSkill[type]];
          }.bind(this), 0);
        } else {
          return 0;
        }
      }.bind(this), 0);
    },
  
    computeHeaderData: function() {
      var headerData = {};
  
      for (var headerId in this.props.headers) {
        var header = this.props.headers[headerId];
  
        var skillData = {};
        for (var skillId in header.skills) {
          var skill = header.skills[skillId];
  
          skillData[skillId] = {
            "name": skill.name,
            "cost": skill.cost,
            "description": skill.description,
            "purchased": this.state.purchasedSkills[skillId] || {},
            "canBuy": this.state.purchasedHeaders[headerId] ? true : false,
            "updatePurchased": {
              "constant": this.generateBuySkillCallback(skillId, "constant"),
              "perEvent": this.generateBuySkillCallback(skillId, "perEvent"),
              "perBattle": this.generateBuySkillCallback(skillId, "perBattle")
            }
          }
        }
  
        headerData[headerId] = {
          "name": header.name,
          "cost": header.cost,
          "description": header.description,
          "prerequisites": this.computePrerequisitesSatisfied(headerId),
          "group": header.group,
          "purchased": this.state.purchasedHeaders[headerId] ? true : false,
          "canBuy": this.computeCanBuy(headerId),
          "canSell": this.computeCanSell(headerId),
          "updatePurchased": this.generateBuyHeaderCallback(headerId),
          "skills": skillData
        }
      }
  
      return headerData;
    },
  
    render: function() {
      return (
        <div>
          <CharacterInfo
            characterName={this.state.characterName}
            race={this.state.race}
            culture={this.state.culture}
            spentXP={this.computeSpentXP()}
            totalXP={this.props.characterData.totalXP}
            spentCP={this.computeSpentCP()}
            totalCP={this.props.characterData.totalCP}
            updateCharacterName={this.updateCharacterName}
            updateRace={this.updateRace}
            updateCulture={this.updateCulture}
            saveCharacter={this.saveCharacter}
          />
  
          <CharacterSkills headers={this.computeHeaderData()} />
        </div>
      );
    }
  });

  return CharacterGenerator;
});

