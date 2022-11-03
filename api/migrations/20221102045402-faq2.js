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
  INSERT INTO terms (id,name,year) values 
  (1, 'Client Side', 'Year 1'), 
  (2, 'Server Side', 'Year 1'), 
  (3, 'Full Stack', 'Year 1'), 
  (4, 'Agile Dev-ops', 'Year 1'), 
  (5, 'App sec', 'Year 2'), 
  (6, 'Mobile app development', 'Year 2'), 
  (7, 'Machine learning intro', 'Year 2'), 
  (8, 'Capstone', 'Year 2');

  
  INSERT INTO topics (id,name,termid) values 
  (1, 'HTML',1),
  (2, 'CSS',2),
  (3, 'VSCode',3),
  (4, 'Github',4),
  (5, 'FAQ',5),
  (6, 'Security',6),
  (7, 'React native',7),
  (8, 'Python',8),    
  (9, 'Project1',1),
  (10, 'Project2',2),
  (11, 'Project3',3),
  (12, 'Project4',4),
  (13, 'Project5',5),
  (14, 'Project6',6),
  (15, 'Project7',7),
  (16, 'Project8',8);
   
  
  INSERT INTO questions (id,description,topicid) values 
  (1, 'What is HTML?',1),
  (2, 'What is CSS?',2),
  (3, 'How do i pull a branch?',3),
  (4, 'How do i resolve a merge conflict?',4),
  (5, 'When do i run npm Install?',5),
  (6, 'Is it safe to store encrypted key into DB?',6),
  (7, 'soluta repellat?',1),
  (8, 'quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti?',2),
  (9, 'How do i pull a branch?',3),
  (10, 'qui doloremque soluta sit?',4),
  (11, 'internos culpa eum repellat officiis ad ullam?',5),
  (12, 'molestias voluptatem qui doloremque soluta?',6),
  (13, 'Et eaque galisum ex nisi libero ad soluta?',3),
  (14, 'porro et tenetur repellat?',4),
  (15, 'soluta repellat a internos culpa?',5),
  (16, 'molestias voluptatem qui doloremque soluta?',6),
  (17, 'quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti?',1),
  (18, 'Aut quibusdam incidunt ea error aliquam 33 atque odio?',2),
  (19, 'Et eaque galisum ex nisi libero ad soluta?',3),
  (20, 'porro et tenetur repellat?',4),
  (21, 'soluta repellat a internos culpa?',5),
  (22, 'molestias voluptatem qui doloremque soluta?',6),
  (23, 'quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti?',1),
  (24, 'Aut quibusdam incidunt ea error aliquam 33 atque odio?',2),
  (25, 'Et eaque galisum ex nisi libero ad soluta?',3),
  (26, 'porro et tenetur repellat?',4),
  (27, 'soluta repellat a internos culpa?',5),
  (28, 'molestias voluptatem qui doloremque soluta?',6),
  (29, 'Et eaque galisum ex nisi libero ad soluta?',3),
  (30, 'porro et tenetur repellat?',4),
  (31, 'soluta repellat a internos culpa?',5),
  (32, 'molestias voluptatem qui doloremque soluta?',6);

     
   INSERT INTO answers (questionid, description) values 
  (1, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (1, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (2, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (2, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (3, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (3, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (4, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (4, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (5, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (5, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (6, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (6, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (7, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (7, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (8, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (8, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (9, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (9, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (10, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (10, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (11, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (11, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (12, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (12, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (13, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (13, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (14, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (14, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (15, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (15, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (16, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (16, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (17, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (17, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (18, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (18, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (19, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (19, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (20, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (20, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (21, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (21, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (22, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (22, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (23, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (23, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (24, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (24, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (25, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (25, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (26, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (26, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (27, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (27, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (28, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (28, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.'),
  (29, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (29, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (30, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (30, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (31, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.'),
  (31, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.'),
  (32, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.') ,
  (32, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.');
`);
  return null;
};

exports.down = function (db) {
  db.runSql(`
  delete from answers;  
  delete from questions;  
  delete from users;     
  delete from topics;  
  delete from terms;
  `);
  return null;
};

exports._meta = {
  version: 1,
};
