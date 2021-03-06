DROP TABLE IF EXISTS folders;
DROP TABLE IF EXISTS notes;

CREATE TABLE folders
(
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL
);

CREATE TABLE notes
(
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT,
  date_modified TIMESTAMP DEFAULT now() NOT NULL,
  folderid TEXT NOT NULL,
  content TEXT NOT NULL

);