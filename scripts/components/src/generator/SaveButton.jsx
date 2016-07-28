define([], function() {
  var SaveButton = React.createClass({
    render: function() {
      return (
        <button type="button" className="saveButton" onClick={this.props.saveCharacter} >
          Save
        </button>
      )
    }
  });

  return SaveButton;
})
