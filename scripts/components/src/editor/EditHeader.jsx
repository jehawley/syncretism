define(['editor/EditSkill', 'editor/EditHeaderAttributes'], function(EditSkill, EditHeaderAttributes) {
  var EditHeader = React.createClass({
    propTypes: {

    },

    getInitialState: function() {
      return ({
        
      })
    },

    createNewSkill: function(event) {
      
    },

    render: function() {
      return (
        <div>
          <button onClick={this.createNewSkill}>New Skill</button>
        </div>
      );
    }
  });

  return EditHeader;
});
