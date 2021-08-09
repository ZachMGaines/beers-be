DROP TABLE IF EXISTS beers;
CREATE TABLE beers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  abv TEXT NOT NULL,
  type TEXT NOT NULL,
  rating INTEGER NOT NULL
);