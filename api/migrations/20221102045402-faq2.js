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
  INSERT INTO terms (id,name,year) values (1, 'Client Side', 5), 
  (2, 'Server Side', 'Year 1'), 
  (3, 'Full Stack', 'Year 1'), 
  (4, 'Agile Dev-ops', 'Year 1'), 
  (5, 'Projects', 'Year 1'), 
  (6, 'App sec', 'Year 2'), 
  (7, 'Mobile app development', 'Year 2'), 
  (8, 'Machine learning intro', 'Year 2'), 
  (9, 'Capstone', 'Year 2');

  
  INSERT INTO topics (id,name,termid) values 
  (1, 'HTML',1),
  (2, 'CSS',1),
  (3, 'VSCode',3),
  (4, 'Github',4),
  (5, 'FAQ',5),
  (6, 'Security',6),
  (7, 'React native',7),
  (8, 'Python',8),    
  (9, 'Project1',1),
  (10, 'Project1',1),
  (11, 'Project1',3),
  (12, 'Project1',4),
  (13, 'Project1',5),
  (14, 'Project1',6),
  (15, 'Project1',7),
  (16, 'Project1',8),
  (17, 'Project2',1),
  (18, 'Project2',1),
  (19, 'Project2',3),
  (20, 'Project2',4),
  (21, 'Project2',5),
  (22, 'Project2',6),
  (23, 'Project2',7),
  (24, 'Project2',8);    
  
  INSERT INTO questions (id,description,topicid) values 
  (1, 'What is HTML?',1),
  (2, 'What is CSS?',2),
  (3, 'How do i pull a branch?',3),
  (4, 'How do i resolve a merge conflit?',4),
  (5, 'When do i run npm Install?',5),
  (6, 'Is it safe to store encrypted key into DB?',6);

     
   INSERT INTO answers (id,description,questionid) values 
  (1, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.',1),
  (2, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.',2),
  (3, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.',3),
  (4, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.',4) ,
  (5,'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.',1);
`);
  return null;
};

exports.down = function (db) {
  db.runSql(`
  DELETE from answer;
  DELETE from question;
  DELETE from users;
  DELETE from topic;
  DELETE from term;
  `);
  return null;
};

exports._meta = {
  version: 1,
};
