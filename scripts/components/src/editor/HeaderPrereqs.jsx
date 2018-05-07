define([], function() {
  var HeaderPrereqs = React.createClass({
    propTypes: {
      parentHeaderId: React.PropTypes.number.isRequired,
      headers: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string
      })),
      prereqs: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        removePrereq: React.PropTypes.func
      }))
    },

    getInitialState: function() {
      return ({
      
      });
    },

    addPrereq: function(event) {
      if (event.target.value !== -1) {

      }
    },

    render: function() {
      var prereqChoices = this.props.headers.filter(function(header) {
        return (header.id !== this.props.parentHeader.id) && (-1 === this.props.prereqs.findIndex(function(prereq) {
          return prereq.id === header.id;
        }.bind(this)));
      }.bind(this)).map(function(header) {
        return <option value={header.id} key={header.id}>{header.name}</option>
      });
      prereqChoices.unshift(<option value={-1} key={-1}></option>);

      var selectedPrereqs = this.props.prereqs.map(function(header) {
        return (
          <li>
            <button onClick={header.removePrereq}>X</button>
            <span>{header.name}</span>
          </li>
        );
      });

      return (
        <div>
          <select value={-1} onChange={this.addPrereq}>
            {prereqChoices}
          </select>
          <ul>
            {selectedPrereqs}
          </ul>
        </div>
      );
    }
  });

  return HeaderPrereqs;
});
