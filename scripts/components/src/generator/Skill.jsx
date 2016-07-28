define(['generator/SkillBuySection', 'generator/Expander'], function(SkillBuySection, Expander) {
  var Skill = React.createClass({
    getInitialState: function() {
      return ({
        open: false,
      });
    },
  
    toggleOpen: function () {
      this.setState({
        open: !(this.state.open)
      });
    },
  
    render: function() {
      var skillClasses = "skill";
      var descriptionClasses = "skillDescription";
      descriptionClasses += this.state.open ? " open" : " closed";
      return (
        <div className={skillClasses}>
          <div>
            <Expander open={this.state.open} onClick={this.toggleOpen} />
            <div className="skillHeader">
              <span className="skillName headerLine">{this.props.name}</span>
              <SkillBuySection cost={this.props.cost} purchased={this.props.purchased} canBuy={this.props.canBuy} updatePurchased={this.props.updatePurchased} />
            </div>
          </div>
          <div className={descriptionClasses}>
            <span>{this.props.description}</span>
          </div>
        </div>
      );
    }
  });

  return Skill;
});
