UPDATE character_info
SET
  name = $1,
  race = $2,
  culture = $3
WHERE id = $4
