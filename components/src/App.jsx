window.initApp = function() {
  ReactDOM.render(<CharacterGenerator headers={window.propsJson.headers}
                                      characterData={window.propsJson.characterData} />,
                  document.getElementById('content'));
};
