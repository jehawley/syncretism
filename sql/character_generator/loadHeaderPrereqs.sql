SELECT hp.header_id, hp.prereq_header_id
FROM header_prereq hp
  JOIN header_visibility hv ON hv.header_id = hp.id
WHERE hv.character_id IS NULL OR hv.character_id = $1
