WITH experience AS (
  SELECT ce.type, sum(ce.amount) AS total, ce.character_id
  FROM character_experience ce
  WHERE ce.character_id = $1
  GROUP BY ce.type, ce.character_id
)
SELECT c.name, c.race, c.culture, COALESCE(cp.total, 0) AS total_cp, COALESCE(xp.total, 0) AS total_xp
FROM character_info c
  LEFT JOIN experience cp ON cp.type = 'CP' AND cp.character_id = c.id
  LEFT JOIN experience xp ON xp.type = 'XP' AND xp.character_id = c.id
WHERE c.id = $2
