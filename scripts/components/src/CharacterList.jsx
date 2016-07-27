define(['components/compiled/CharacterRow', 'components/compiled/NewCharacterRow'], function(CharacterRow, NewCharacterRow) {
  var CharacterList = React.createClass({
    propTypes: {
      characters: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
      var characterComponents = characters.map(function(character) {
        return <CharacterRow
                 name={character.name}
                 race={character.race}
                 culture={character.culture}
                 totalCP={character.totalCP}
                 totalXP={character.totalXP}
                 key={character.character_id}
               />
      });
      return (
        <div>
          <div className="allCharacters">
            {characterComponents}
          </div>
          <NewCharacterRow />
        </div>
      );
    }
  });

  return CharacterList;
});
