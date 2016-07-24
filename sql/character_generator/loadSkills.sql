SELECT s.header_id, s.id, s.name, s.description, sc.type AS cost_type, sc.params AS cost_params
FROM skill s
  JOIN header_visibility hv ON hv.header_id = s.header_id
  JOIN skill_cost sc ON sc.skill_id = s.id 
WHERE hv.character_id IS NULL OR hv.character_id = $1
