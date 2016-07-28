define([], function() { 
  var BuyHeaderButton = React.createClass({
    handleClick: function() {
      if (this.props.purchased && this.props.canSell) {
        this.props.updatePurchased(false);
      } else if (!this.props.purchased && this.props.canBuy) {
        this.props.updatePurchased(true);
      }
    },
  
    render: function () {
      var classNames = "buyHeaderButton";
      var buttonActive = (this.props.purchased && this.props.canSell) || (!this.props.purchased && this.props.canBuy);
      return (
        <button type="button" className={classNames} onClick={this.handleClick} disabled={!buttonActive} >
          {this.props.purchased ? "Sell (" + this.props.cost + " XP)" : "Buy (" + this.props.cost + " XP)"}
        </button>
      );
    }
  });

  return BuyHeaderButton;
});
