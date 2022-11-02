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

    Create TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar
    );


    CREATE TABLE term (
      id SERIAL PRIMARY KEY,
      name varchar,
      level int
    );


    CREATE TABLE topic (
      id SERIAL PRIMARY KEY,
      name varchar,
      termId int
    );


    CREATE TABLE question (
      id SERIAL PRIMARY KEY,
      description varchar,
      isStarred bool,
      isReviewed bool,
      createdOn timestamp,
      topicId int,
      userId int
    );


    CREATE TABLE answer (
      id SERIAL PRIMARY KEY,
      description varchar,
      isStarred bool,
      isReviewed bool,
      createdOn timestamp,
      questionId int,
      userId int
    );

  ALTER TABLE topic ADD FOREIGN KEY (termId) REFERENCES term (id);
  ALTER TABLE answer ADD FOREIGN KEY (questionId) REFERENCES question (id);  
  ALTER TABLE answer ADD FOREIGN KEY (userId) REFERENCES users (id);
  ALTER TABLE question ADD FOREIGN KEY (topicId) REFERENCES topic (id);  
  ALTER TABLE question ADD FOREIGN KEY (userId) REFERENCES users (id);  
  `);
  return null;
};
exports.down = function (db) {
  db.runSql(`
  drop table answer;
  drop table question;
  drop table users;
  drop table topic;
  drop table term;
  `);
  return null;
};

exports._meta = {
  version: 1,
};
