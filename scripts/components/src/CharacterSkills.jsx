define(['components/compiled/HeaderGroup'], function(HeaderGroup) {
  var CharacterSkills = React.createClass({
    render: function() {
      var headerGroups = {};
      for (var headerId in this.props.headers) {
        var header = this.props.headers[headerId];
        var grouping = headerGroups[header.group];
        if (!grouping) {
          headerGroups[header.group] = {};
          grouping = headerGroups[header.group];
        }
        grouping[headerId] = header;
      }
  
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
