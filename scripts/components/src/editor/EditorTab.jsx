define([], function() {
  var EditorTab = React.createClass({
    propTypes: {
      title: React.PropTypes.string.isRequired,
      selected: React.PropTypes.bool.isRequired,
      changeTab: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
      return ({

      });
    },

    render: function() {
      var classNames = "editorTab";
      classNames += this.props.selected ? ' selected' : '';

      return (
        <div className={classNames} onClick={this.props.changeTab}>
          {this.props.title} 
        </div>
      );
    }
  });

  return EditorTab;
});
