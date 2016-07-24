-- TODO(jhawley): Comments. Comments everywhere
-- TODO(jhawley): Re-evaluate null checks?
-- TODO(jhawley): indexes
-- TODO(jhawley): Enums? (How do they play with my query software?)

CREATE TABLE IF NOT EXISTS trait (
  id           serial PRIMARY KEY,
  name         text NOT NULL UNIQUE,
  description  text NOT NULL
);

-- +++++ Skill tables +++++

CREATE TABLE IF NOT EXISTS header (
  id            serial PRIMARY KEY,
  name          text NOT NULL UNIQUE,
  cost          int NOT NULL,
  header_group  text NOT NULL
);

CREATE TABLE IF NOT EXISTS skill (
  id           serial PRIMARY KEY,
  header_id    int NOT NULL REFERENCES header(id),
  name         text NOT NULL,
  description  text NOT NULL, 
  UNIQUE (header_id, name)
);

CREATE TABLE IF NOT EXISTS header_prereq (
  id                serial PRIMARY KEY,
  header_id         int NOT NULL REFERENCES header(id),
  prereq_header_id  int NOT NULL REFERENCES header(id),
  UNIQUE (header_id, prereq_header_id)
);

CREATE TABLE IF NOT EXISTS header_trait (
  header_id  int  NOT NULL REFERENCES header(id),
  trait_id   int  NOT NULL REFERENCES trait(id),
  UNIQUE (header_id, trait_id)
);

-- TODO(jhawley): Figure out how this actually works
CREATE TABLE IF NOT EXISTS skill_cost (
  id        serial PRIMARY KEY,
  skill_id  int REFERENCES skill(id),
  type      text NOT NULL,
  params    text NOT NULL
);

-- +++++ PC data tables +++++

CREATE TABLE IF NOT EXISTS player (
  id       serial PRIMARY KEY,
  user_id  int UNIQUE
);

CREATE TABLE IF NOT EXISTS character_info (
  id           serial PRIMARY KEY,
  player_id    int NOT NULL REFERENCES player(id),
  name         text NOT NULL,
  race         text NOT NULL,
  culture      text NOT NULL
);

CREATE TABLE IF NOT EXISTS character_experience (
  id            serial PRIMARY KEY,
  character_id  int NOT NULL REFERENCES character_info(id),
  amount        int NOT NULL,
  type          text NOT NULL,
  reason        text,
  award_date    date DEFAULT now()::date
);

CREATE TABLE IF NOT EXISTS header_visibility (
  character_id  int REFERENCES character_info(id),
  header_id     int NOT NULL REFERENCES header(id),
  UNIQUE (character_id, header_id)
);

CREATE TABLE IF NOT EXISTS purchased_header (
  character_id  int NOT NULL REFERENCES character_info(id),
  header_id     int NOT NULL REFERENCES header(id),
  UNIQUE (character_id, header_id)
);

CREATE TABLE IF NOT EXISTS purchased_skill (
  character_id  int NOT NULL REFERENCES character_info(id),
  skill_id      int NOT NULL REFERENCES skill(id),
  type          text NOT NULL,
  level         int NOT NULL,
  UNIQUE (character_id, skill_id, type)
);

CREATE TABLE IF NOT EXISTS character_trait_override (
  character_id  int NOT NULL REFERENCES character_info(id),
  trait_id      int NOT NULL REFERENCES trait(id),
  include       bool NOT NULL,
  UNIQUE (character_id, trait_id)
);

