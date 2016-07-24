SELECT h.id, h.name, h.cost, h.header_group
FROM header h
  JOIN header_visibility hv ON hv.header_id = h.id
WHERE hv.character_id IS NULL OR hv.character_id = $1
