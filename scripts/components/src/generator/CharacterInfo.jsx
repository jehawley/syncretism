define(['generator/SaveButton'], function(SaveButton) {
  var CharacterInfo = React.createClass({
    updateCharacterName: function(event) {
      this.props.updateCharacterName(event.target.value);
    },
  
    updateRace: function(event) {
      this.props.updateRace(event.target.value);
    },
  
    updateCulture: function(event) {
      this.props.updateCulture(event.target.value);
    },
  
    render: function() {
      var xpTotalClassNames = "experienceTotal";
      xpTotalClassNames += this.props.spentXP > this.props.totalXP ? " overspent" : "";
      var cpTotalClassNames = "experienceTotal";
      cpTotalClassNames += this.props.spentCP > this.props.totalCP ? " overspent" : "";
  
      // TODO(jhawley): label tags instead of spans?
      // TODO(jhawley): Make the selects their own component type?
      return (
        <div className="characterInfo">
          <div className="characterName">
            <span>Character Name: </span>
            <input type="text" value={this.props.characterName} onChange={this.updateCharacterName} />
          </div>
          <div className="characterOrigin">
            <div className="originLine">
              <span>Race: </span>
              <select value={this.props.race} onChange={this.updateRace}>
                <option value="Enia">Enia</option>
                <option value="Okonia">Okonia</option>
                <option value="Mangaro">Mangaro</option>
              </select>
            </div>
            <div className="originLine">
              <span>Culture: </span>
              <select value={this.props.culture} onChange={this.updateCulture}>
                <option value="Khemet">Khemet</option>
                <option value="Grove">Grove</option>
                <option value="Trilith">Trilith</option>
              </select>
            </div>
          </div>
          <div className="experience">
            <div className="experienceLine">
              <span className="experienceLabel">XP: </span>
              <span className={xpTotalClassNames}>
                <span>{this.props.spentXP}</span><span>/</span><span>{this.props.totalXP}</span>
              </span>
            </div>
            <div className="experienceLine">
              <span className="experienceLabel">CP: </span>
              <span className={cpTotalClassNames}>
                <span>{this.props.spentCP}</span><span>/</span><span>{this.props.totalCP}</span>
              </span>
            </div>
          </div>
          <SaveButton saveCharacter={this.props.saveCharacter} />
        </div>
      );
    }
  });

  return CharacterInfo;
});
