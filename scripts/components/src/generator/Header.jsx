define(['generator/HeaderHeader', 'generator/Skill', 'generator/Expander'], function(HeaderHeader, Skill, Expander) {
  var Header = React.createClass({
    getInitialState: function() {
      return ({
        open: false,
      });
    },
  
    toggleOpen: function() {
      this.setState({
        open: !(this.state.open)
      });
    },
  
    render: function() {
      var skills = this.props.skills || {};
      // TODO(jhawley): Somehow sort skill list (by rank) here (a-b for sort function?)
      var skillElements = Object.keys(skills).map(function(skillId) {
        var skill = skills[skillId];
        return {
          rank: skill.rank,
          element: (
            <Skill
              name={skill.name}
              description={skill.description}
              cost={skill.cost}
              purchased={skill.purchased}
              canBuy={skill.canBuy}
              updatePurchased={skill.updatePurchased}
              key={skillId}
            />
          )
        }
      }).sort(function(skillA, skillB) {
        return skillA.rank - skillB.rank;
      }).map(function(skill) {
        return skill.element;
      });
      var headerClasses = "header";
     headerClasses += this.props.purchased ? " purchased" : "";
      var headerSkillsClasses = "headerSkills";
      headerSkillsClasses += this.state.open ? " open" : " closed";
      return (
        <div className={headerClasses}>
          <div className="headerHeader">
            <Expander open={this.state.open} onClick={this.toggleOpen} />
            <HeaderHeader
              name={this.props.name}
              cost={this.props.cost}
              prerequisites={this.props.prerequisites}
              purchased={this.props.purchased}
              canSell={this.props.canSell}
              canBuy={this.props.canBuy}
              updatePurchased={this.props.updatePurchased}
            />
          </div>
          <div className={headerSkillsClasses}>
            {skillElements}
          </div>
        </div>
      );
    }
  });

  return Header;
});
