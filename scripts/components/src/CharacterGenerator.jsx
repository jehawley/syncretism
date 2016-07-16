define(['components/compiled/CharacterInfo', 'components/compiled/CharacterSkills'], function(CharacterInfo, CharacterSkills) {
  var CharacterGenerator = React.createClass({
    getInitialState: function() {
      // TODO(jhawley): Change initial header purchased state to work off a separate "character db state" object
      var purchasedHeaders = {};
      for (var headerId in this.props.headers) {
        header = this.props.headers[headerId];
        if (header.purchased) {
          purchasedHeaders[headerId] = true;
        }
      }
  
      var purchasedSkills = {};
      for (var headerId in this.props.headers) {
        var header = this.props.headers[headerId];
        for (var skillId in header.skills) {
          var skill = header.skills[skillId];
          if (skill.purchased) {
            var purchasedSkillsForHeader = purchasedSkills[headerId];
            if (!purchasedSkillsForHeader) {
              var skillPurchased = {};
              skillPurchased[skillId] = skill.purchased;
              purchasedSkills[headerId] = skillPurchased;
            } else {
              purchasedSkillsForHeader[skillId] = skill.purchased;
            }
          }
        }
      }
  
      return ({
        characterName: this.props.characterData.characterName,
        characterRace: this.props.characterData.characterRace,
        characterCulture: this.props.characterData.characterCulture,
        purchasedHeaders: purchasedHeaders,
        purchasedSkills: purchasedSkills
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
  
          return {"purchasedHeaders": purchasedHeaders};
        });
      }.bind(this);
    },
  
    generateBuySkillCallback: function(headerId, skillId, purchaseType) {
      // TODO(jhawley): This isn't quite right, because the skills purchased state is sparse
      return function(newPurchased) {
        this.setState(function (previousState, currentProps) {
          var purchasedSkills = {};
  
          for (var hId in previousState.purchasedSkills) {
            if (hId !== headerId) {
              purchasedSkills[hId] = previousState.purchasedSkills[hId];
            }
          }
          
          // TODO(jhawley): Optimize to reduce the unnecessary hash lookups by constructing the object then putting it in the right place.
          purchasedSkills[headerId] = {};
          var previousHeaderPurchasedSkills = previousState.purchasedSkills[headerId] || {};
          for (var sId in previousHeaderPurchasedSkills) {
            if (sId !== skillId) {
              purchasedSkills[headerId][sId] = previousHeaderPurchasedSkills[sId];
            }
          }
  
          purchasedSkills[headerId][skillId] = {};
          var previousPurchasedSkill = previousHeaderPurchasedSkills[skillId];
          for (var type in previousPurchasedSkill) {
            purchasedSkills[headerId][skillId][type] = previousPurchasedSkill[type];
          }
          purchasedSkills[headerId][skillId][purchaseType] = newPurchased;
  
          return {"purchasedSkills": purchasedSkills};
        });
      }.bind(this);
    }, 
  
    updateCharacterName: function(name) {
      this.setState({"characterName": name});
    },
  
    updateCharacterRace: function(race) {
      this.setState({"characterRace": race});
    },
  
    updateCharacterCulture: function(culture) {
      this.setState({"characterCulture": culture});
    },
  
    saveCharacter: function() {
      // TODO(jhawley): Talk to the server yo
      console.log('Totally real save-ty');
    },
  
    computeSpentXP: function() {
      var totalCost = 0;
      for (var headerId in this.state.purchasedHeaders) {
        totalCost += this.props.headers[headerId].cost;
      }
      return totalCost;
    },
  
    computeSpentCP: function() {
      var totalCost = 0;
      for (var headerId in this.state.purchasedSkills) {
        var headerPurchasedSkills = this.state.purchasedSkills[headerId];
        for (var skillId in headerPurchasedSkills) {
          var skillPurchased = headerPurchasedSkills[skillId];
          var skillCosts = this.props.headers[headerId].skills[skillId].cost;
          if (skillCosts.constant && skillPurchased.constant) {
            totalCost += skillCosts.constant[skillPurchased.constant];
          }
          if (skillCosts.perEvent && skillPurchased.perEvent) {
            totalCost += skillCosts.perEvent[skillPurchased.perEvent];
          }
          if (skillCosts.perBattle && skillPurchased.perBattle) {
            totalCost += skillCosts.perBattle[skillPurchased.perBattle];
          }
        }
      }
      return totalCost;
    },
  
    computeHeaderData: function() {
      var headerData = {};
  
      for (var headerId in this.props.headers) {
        var header = this.props.headers[headerId];
        var headerSkillsPurchased = this.state.purchasedSkills[headerId];
  
        var skillData = {};
        for (var skillId in header.skills) {
          var skill = header.skills[skillId];
  
          skillData[skillId] = {
            "name": skill.name,
            "cost": skill.cost,
            "description": skill.description,
            "purchased": headerSkillsPurchased ? headerSkillsPurchased[skillId] : {},
            "canBuy": this.state.purchasedHeaders[headerId] ? true : false,
            "updatePurchased": {
              "constant": this.generateBuySkillCallback(headerId, skillId, "constant"),
              "perEvent": this.generateBuySkillCallback(headerId, skillId, "perEvent"),
              "perBattle": this.generateBuySkillCallback(headerId, skillId, "perBattle")
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
      var spentXP = this.computeSpentXP();
      var spentCP = this.computeSpentCP();
  
      return (
        <div>
          <CharacterInfo characterName={this.state.characterName} characterRace={this.state.characterRace} characterCulture={this.state.culture} spentXP={spentXP} totalXP={this.props.characterData.totalXP} spentCP={spentCP} totalCP={this.props.characterData.totalCP} updateCharacterName={this.updateCharacterName} updateCharacterRace={this.updateCharacterRace} updateCharacterCulture={this.updateCharacterCulture} saveCharacter={this.saveCharacter} />
  
          <CharacterSkills headers={this.computeHeaderData()} />
        </div>
      );
    }
  });

  return CharacterGenerator;
});

