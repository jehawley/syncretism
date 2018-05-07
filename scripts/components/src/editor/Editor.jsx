define(['editor/HeaderEditor',
        'editor/CharacterEditor',
        'editor/EditorTab'],
  function(HeaderEditor, CharacterEditor, EditorTab) {
  var Editor = React.createClass({
    propTypes: {

    },

    getInitialState: function() {
     return ({
       selectedTab: 'Header',
       tabData: undefined
     });
    },

    // TODO(jhawley): You can't use ordinary methods before component instances are created.
    // Can I save myself the code duplication somehow?
    componentDidMount: function() {
      var tab = 'Header';
      this.tabRequest && this.tabRequest.abort();

      var endpoint = '';
      switch(tab) {
        case 'Header':
          endpoint = 'headers';
          break;
        case 'Character':
          endpoint = 'characters';
          break;
        default:
          // TODO(jhawley): Something
      }
      this.tabRequest = new XMLHttpRequest();
      this.tabRequest.open('GET', '/loadEditable/' + endpoint);
      this.tabRequest.setRequestHeader('Content-type', 'application/json');
      this.tabRequest.onload = function() {
        if (this.tabRequest.status === 200) {
          this.setState({
            selectedTab: tab,
            tabData: JSON.parse(this.tabRequest.responseText)
          });
        } else {
          // TODO(jhawley): Handle error
        }
      }.bind(this);
      this.tabRequest.send();
    },

    componentWillUnmount: function() {
      this.tabRequest && this.tabRequest.abort();
    },

    generateChangeTabCallback: function(tab) {
      return function() {
        this.tabRequest && this.tabRequest.abort();

        var endpoint = '';
        switch(tab) {
          case 'Header':
            endpoint = 'headers';
            break;
          case 'Character':
            endpoint = 'characters';
            break;
          default:
            // TODO(jhawley): Something
        }
        this.tabRequest = new XMLHttpRequest();
        this.tabRequest.open('GET', '/loadEditable/' + endpoint);
        this.tabRequest.setRequestHeader('Content-type', 'application/json');
        this.tabRequest.onload = function() {
          if (this.tabRequest.status === 200) {
            this.setState({
              selectedTab: tab,
              tabData: JSON.parse(this.tabRequest.responseText)
            });
          } else {
            // TODO(jhawley): Handle error
          }
        }.bind(this);
        this.tabRequest.send();
      }.bind(this);
    },

    render: function() {
      var tabSelectors = ['Header', 'Character'].map(function(tab) {
        return <EditorTab title={tab} selected={this.state.selectedTab === tab} changeTab={this.generateChangeTabCallback(tab)} key={tab} /> 
      }.bind(this));

      var tabContent = null;
      if (!this.state.tabData) {
        tabContent = <span>Loading...</span>
      } else {
        switch(this.state.tabData) {
          case 'Header':
            tabContent = <HeaderEditor />
            break;
          case 'Character':
            tabContent = <CharacterEditor />
            break;
          default:
            // TODO(jhawley): Something
        }
      }

      return (
        <div>
          <div className="tabs">
            {tabSelectors}
          </div>
          <div className="tabContent">
            {tabContent}
          </div>
        </div>
      );
    }
  });

  return Editor;
});
