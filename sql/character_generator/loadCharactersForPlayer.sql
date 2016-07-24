SELECT c.id, c.name
FROM character_info c
WHERE c.player_id = $1
