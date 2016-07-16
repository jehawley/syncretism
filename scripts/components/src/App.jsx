define(['components/compiled/CharacterGenerator'], function(CharacterGenerator) {
  return function(propsJson) {
    ReactDOM.render(<CharacterGenerator headers={propsJson.headers}
                                        characterData={propsJson.characterData} />,
                    document.getElementById('content'));
  };
});
