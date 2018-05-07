define(['editor/RankAdjuster'], function(RankAdjuster) {
  var EditSkill = React.createClass({
    propTypes: {

    },

    render: function() {
      // TODO(jhawley): Such on-click. Wow. Amaze.
      return (
        <div>
          <RankAdjuster />
          <div>
            <label>Name: <input type="text" /></label>
          </div>
        </div>
      );
    }
  });

  return EditSkill;
});
