define(['generator/Header', 'generator/Expander'], function(Header, Expander) {
  var HeaderGroup = React.createClass({
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
      var headerGroupClasses = "headerGroup";
      headerGroupClasses += ' ' + this.props.group.replace(/\s+/g, '');
  
      var headerListClasses = "headerList";
      headerListClasses += this.state.open ? " open" : " closed";
  
      var headers = this.props.headers || {};
      var headerElements = Object.keys(headers).map(function(headerId) {
        var header = headers[headerId];
        return (
          <Header
            name={header.name}
            cost={header.cost}
            description={header.description}
            prerequisites={header.prerequisites}
            purchased={header.purchased || false}
            canBuy={header.canBuy || false}
            canSell={header.canSell || false}
            updatePurchased={header.updatePurchased}
            skills={header.skills}
            key={headerId}
          />
        );
      });
  
      return (
        <div className={headerGroupClasses}>
          <div className="headerGroupHeader">
            <Expander open={this.state.open} onClick={this.toggleOpen} />
            <span>{this.props.group}</span>
          </div>
          <div className={headerListClasses} >
            {headerElements}
          </div>
        </div>
      );
    }
  });

  return HeaderGroup;
});
