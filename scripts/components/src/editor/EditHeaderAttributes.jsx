define(['editor/HeaderPrereqs'], function(HeaderPrereqs) {
  var EditHeaderAttributes = React.createClass({
    propTypes: {

    },

    updateName: function(event) {
      this.props.updateName(event.target.value);
    },

    updateCost: function(event) {
      this.props.updateCost(event.target.value);
    },

    updateGroup: function(event) {
      this.props.updateGroup(event.target.value);
    },

    updateIsPublic: function(event) {
      this.props.updateIsPublic(event.target.checked);
    },

    render: function() {
      // TODO(jhawley): Restrict header group somehow?
      // TODO(jhawley): Prereqs
      <div>
        <label>Name: <input type="text" value={this.props.name} onChange={this.updateName} /></label>
        <label>Cost: <input type="number" value={this.props.cost} onChange={this.updateCost} min="0" step="1" /> XP</label>
        <label>Group: <input type="text" value={this.props.group} onChange={this.updateGroup} /></label>
        <label>Public? <input type="checkbox" value="isPublicHeader" checked={this.props.isPublicHeader} onClick={this.updateIsPublic} /></label>
        <HeaderPrereqs />
        {this.props.isNewHeader ? <button onClick={this.props.createNewHeader}>Create Header</button> : null} 
      </div>
    }
  });

  return EditHeaderAttributes;
});
