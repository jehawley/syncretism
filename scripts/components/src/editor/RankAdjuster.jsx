define([], function() {
  var RankAdjuster = React.createClass({
    propTypes: {

    },

    render: function() {
      return (
        // TODO(jhawley): Such on-click. Wow. Amaze.
        <div>
          {this.props.top ? null : <button>+</button>}
          {this.props.bottom ? null : <button>-</button>}
        </div>
      );
    }
  });

  return RankAdjuster;
});
