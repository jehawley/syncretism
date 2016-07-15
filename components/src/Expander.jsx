
window.Expander = React.createClass({
  render: function() {
    return (
      <div className="expander" onClick={this.props.onClick} >
        <span>{this.props.open ? '-' : '+'}</span>
      </div>
    );
  }
});
