define([], function() {
  var CharacterRow = React.createClass({
    propTypes: {
      name: React.PropTypes.string,
      race: React.PropTypes.string,
      culture: React.PropTypes.string,
      totalCP: React.PropTypes.number,
      totalXP: React.PropTypes.number
    },

    render: function() {
      return (
        <div className="characterRow">
          <div className="characterName">
            {this.props.name}
          </div>
          <div className="characterOrigin">
            <label>Race: <span>{this.props.race}</span></label>
            <label>Culture: <span>{this.props.culture}</span></label>
          </div>
          <div className="experience">
            <label>XP: <span>{this.props.totalXP}</span></label>
            <label>CP: <span>{this.props.totalCP}</span></label>
          </div>
          <div className="actions">
            <button>Edit</button>
            <button>View</button>
          </div>
        </div>
      );
    }
  });

  return CharacterRow;
});
