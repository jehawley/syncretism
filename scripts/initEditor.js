require.config({
  paths: {
    editor: './components/compiled/editor'
  }
});
require(['components/compiled/editor/EditorApp'], function(EditorApp) {
  EditorApp();
});
