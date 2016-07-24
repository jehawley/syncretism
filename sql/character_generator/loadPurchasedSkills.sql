SELECT ps.skill_id, ps.type, ps.level
FROM purchased_skill ps
WHERE character_id = $1
