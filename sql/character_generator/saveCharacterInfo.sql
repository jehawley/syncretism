UPDATE character_info ci
SET
  ci.name = $1,
  ci.race = $2,
  ci.culture = $3
FROM upsert_data ud
WHERE ci.character_id = ud.$4
  AND ci.player_id = ud.$5
