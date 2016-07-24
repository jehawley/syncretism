SELECT ph.header_id
FROM purchased_header ph
WHERE ph.character_id = $1
