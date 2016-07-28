define([], function() {
  var NewCharacterRow = React.createClass({
    getInitialState: function() {
      return({
        name: '',
        race: 'Enia',
        culture: 'Khemet'
      });
    },

    updateName: function(event) {
      this.setState({name: event.target.value});
    },

    updateRace: function(event) {
      this.setState({race: event.target.value});
    },

    updateCulture: function(event) {
      this.setState({culture: event.target.value});
    },
    
    render: function() {
      return (
        <div className="newCharacterRow">
          <div className="characterName">
            <span>Character Name: </span>
            <input type="text" value={this.state.name} onChange={this.updateName} />
          </div>
          <div className="characterOrigin">
            <div className="originLine">
              <span>Race: </span>
              <select value={this.state.race} onChange={this.updateRace}>
                <option value="Enia">Enia</option>
                <option value="Okonia">Okonia</option>
                <option value="Mangaro">Mangaro</option>
              </select>
            </div>
            <div className="originLine">
              <span>Culture: </span>
              <select value={this.state.culture} onChange={this.updateCulture}>
                <option value="Khemet">Khemet</option>
                <option value="Grove">Grove</option>
                <option value="Trilith">Trilith</option>
              </select>
            </div>
          </div>
          <div>
            <button>Create</button>
          </div>
        </div>
      );
    }
  });

  return NewCharacterRow;
});
