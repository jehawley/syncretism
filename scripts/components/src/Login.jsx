define([], function() {
  var Login = React.createClass({
    getInitialState: function() {
      return ({
        username: '',
        password: ''
      });
    },

    setUsername: function(event) {
      this.setState({username: event.target.value});
    },

    setPassword: function(event) {
      this.setState({password: event.target.value});
    },

    attemptLogin: function(event) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login');
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log('Success!');
        } else {
          console.log('Nope!');
        }
      }
      xhr.send();
      // TODO(jhawley):
      // xhr.send(params);
    },

    render: function() {
      // TODO(jhawley): Better scoping of IDs?
      return (
        <form>
          <label for="username">Username: <input type="text" value={this.state.username} id="username" /></label>
          <label for="password">Password: <input type="password" value={this.state.password} id="password" /></label>
          <button type="submit" onClick={this.attemptLogin}>Login</button>
        </form>
      );
    }
  });

  return Login;
});
