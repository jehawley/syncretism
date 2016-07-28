define(['generator/HeaderGroup'], function(HeaderGroup) {
  var CharacterSkills = React.createClass({
    render: function() {
      var headerGroups = Object.keys(this.props.headers).reduce(function(groups, headerId) {
        var header = this.props.headers[headerId];
        groups[header.group] = groups[header.group] || {};
        groups[header.group][headerId] = header;
        return groups;
      }.bind(this), {});
  
      var headerGroupElements = Object.keys(headerGroups).map(function(group) {
        return <HeaderGroup headers={headerGroups[group]} group={group} key={group} />
      });
  
      return (
        <div className="characterSkills">
          {headerGroupElements}
        </div>
      );
    }
  });

  return CharacterSkills;
});
