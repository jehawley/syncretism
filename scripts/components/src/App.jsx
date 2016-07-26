define(['components/compiled/CharacterGenerator'], function(CharacterGenerator) {
  return function(propsJson) {
    ReactDOM.render(<CharacterGenerator
                      characterId={propsJson.characterId}
                      headers={propsJson.headers}
                      characterData={propsJson.characterData} 
                      purchasedHeaders={propsJson.purchasedHeaders}
                      purchasedSkills={propsJson.purchasedSkills}
                    />,
                    document.getElementById('content'));
  };
});
