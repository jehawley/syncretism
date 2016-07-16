require(['components/compiled/App'], function(App) {
  var xhr = new XMLHttpRequest();
  var propsJson; 
  xhr.open('GET', '/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      propsJson = JSON.parse(xhr.responseText) || {};
      window.propsJson = propsJson;
      App(propsJson);
    }
  }
  xhr.send();
});
