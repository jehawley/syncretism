define([], function() {
  // TODO(jhawley): Do some prop validation
  var SkillBuySection = React.createClass({
    // TODO(jhawley): Standardize this somewhere?
    prettyPrintPurchaseType: function(type) {
      switch(type) {
        case "constant":
          return "Constant: ";
        case "perEvent":
          return "Per Event: ";
        case "perBattle":
          return "Per Battle: ";
      }
    },
  
    generateOnChangeEvent: function(type) {
      return function(event) {
        this.props.updatePurchased[type](event.target.value);
      }.bind(this);
    },
  
    render: function() {
      var purchaseTypes = Object.keys(this.props.cost);
      var typeOptions = {};
      purchaseTypes.forEach(function(type) {
        typeOptions[type] = this.props.cost[type].map(function(c, n) {
          return <option value={n} key={n}>{n + " (" + c + " CP" + ")"}</option>
        }.bind(this));
      }.bind(this));
  
      var levelSelectors = purchaseTypes.map(function(type) {
        var onChangeEvent = this.generateOnChangeEvent(type);
        return (
          <div className="skillPurchase headerLine" key={type}>
            <div className="purchaseType headerLine">{this.prettyPrintPurchaseType(type)} </div>
            <select className="skillLevels" value={(this.props.purchased || {})[type] || 0} onChange={onChangeEvent} disabled={!this.props.canBuy}>
              {typeOptions[type]}
            </select>
          </div>
        );
      }.bind(this));
  
      return (
        <div className="buySkill headerLine">
          {levelSelectors}
        </div>
      )
    }
  });

  return SkillBuySection;
});
