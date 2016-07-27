INSERT INTO character_info (player_id, name, race, culture)
  VALUES ($1, $2, $3, $4)
RETURNING id
