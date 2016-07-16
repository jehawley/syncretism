define(['components/compiled/BuyHeaderButton'], function(BuyHeaderButton) {
  var HeaderHeader = React.createClass({
    render: function() {
      var totalPrereqs = Object.keys(this.props.prerequisites || {}).length;
      var prereqElements = [];
      if (totalPrereqs > 0) {
        var prereqElements = Object.keys(this.props.prerequisites).map(function(prereq, i) {
          var delimiter = i < (totalPrereqs - 1) ? ',' : '';
          var prereqClass = this.props.prerequisites[prereq].satisfied ? 'prereq satisfied' : 'prereq unsatisfied';
          return <span className={prereqClass} key={prereq}>{prereq + delimiter}</span>
        }.bind(this));
      }
  
      return (
        <div>
          <div>
            <span>{this.props.name} </span>
            <span><BuyHeaderButton cost={this.props.cost} purchased={this.props.purchased} canSell={this.props.canSell} canBuy={this.props.canBuy} updatePurchased={this.props.updatePurchased} /></span>
          </div>
          <div className="prerequisites">
            {totalPrereqs > 0 ? <span>Prerequisites: </span> : null}{prereqElements}
          </div>
        </div>
      );
    }
  });

  return HeaderHeader;
});
