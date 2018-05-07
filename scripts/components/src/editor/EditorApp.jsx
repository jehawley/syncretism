// TODO(jhawley): Unify this with App.jsx somehow?
define(['editor/Editor'], function(Editor) {
  return function() {
    ReactDOM.render(<Editor
                    />, 
                    document.getElementById('content'));
  };
});
