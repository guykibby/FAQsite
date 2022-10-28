"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.runSql(`
  CREATE TABLE questions ( id serial PRIMARY KEY, question_description TEXT);

  CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id int REFERENCES questions(id) UNIQUE,
    answer_description  TEXT
  );
  
  INSERT INTO questions (id, question_description) VALUES (1,'what is string interpolation?'),
  (2,'what is HTML?');

  INSERT INTO answers (id,question_id,answer_description) VALUES (1,2,'HTML standands for Hyper Text Markup Language');
  `);
  return null;
};
exports.down = function (db) {
  db.runSql(`
  DROP TABLE answers;
  DROP TABLE questions;
  `)
  return null;
};

exports._meta = {
  version: 1,
};
