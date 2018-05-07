define(['editor/EditHeader', 'editor/EditHeaderAttributes'], function(EditHeader, EditHeaderAttributes) {
  var HeaderEditor = React.createClass({
    propTypes: {
      headers: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    getInitialState: function() {
      return ({
        selectedHeader: ''
      });
    },

    changeSelectedHeader: function(event) {
      // TODO(jhawley): Ajax call for header
      //this.setState({selectedHeader: event.target.value});
    },

    saveHeader: function(event) {

    },

    createNewHeader: function(event) {

    },

    render: function() {
      var headerChoices = (this.props.headers || []).map(function(header) {
        return (
          <option value={header.id} key={header.id}>{header.name}</option>
        );
      });

      if (this.state.selectedHeader === '') {
        headerChoices.unshift(<option value="" key="-1"></option>);
      }

      return (
        <div>
          <select value={this.state.selectedHeader} onChange={this.changeSelectedHeader}>
            {headerChoices}
          </select>
          <button onClick={this.saveHeader}>Save Header</button>
          <EditHeaderAttributes isNewHeader={true} />
        </div>
      );
    }
  });

  return HeaderEditor;
});
