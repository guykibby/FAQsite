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

   INSERT INTO users (id, name) values (1, 'kitty'),
   (2, 'Sammy'), (3,'Deanne'), (4, 'John'), (5, 'Maximus'), (6, 'Danny') ,(7,'William'), (8, 'Lance');
   
  
   INSERT INTO term (id,name,level) values (1, 'Client Side', 5), 
    (2, 'Server Side', 'Year 1'), 
    (3, 'Full Stack', 'Year 1'), 
    (4, 'Agile Dev-ops', 'Year 1'), 
    (5, 'Projects', 'Year 1'), 
    (6, 'App sec', 'Year 2'), 
    (7, 'Mobile app development', 'Year 2'), 
    (8, 'Machine learning intro', 'Year 2'), 
    (9, 'Capstone', 'Year 2');

    
    INSERT INTO topic (id,name,termid) values 
    (1, 'HTML',1),
    (2, 'CSS',1),
    (3, 'VSCode',3),
    (4, 'Github',4),
    (5, 'FAQ',5),
    (6, 'Security',6),
    (7, 'React native',7),
    (8, 'Python',8);
    
    
    INSERT INTO question (id,description,isstarred,isreviewed,createdon,topicid,userid) values 
    (1, 'What is HTML?',false,false,'2022-11-02 00:00:00',1,1),
    (2, 'What is CSS?',false,false,'2022-11-02 00:00:00',2,2),
    (3, 'How do i pull a branch?',false,false,'2022-11-02 00:00:00',3,4),
    (4, 'How do i resolve a merge conflit?',false,false,'2022-11-02 00:00:00',4,5),
    (5, 'When do i run npm Install?',false,false,'2022-11-02 00:00:00',5,6),
    (6, 'Is it safe to store encrypted key into DB?',false,false,'2022-11-02 00:00:00',6,7);
  
       
    INSERT INTO answer (id,description,isstarred,isreviewed,createdon,questionid,userid) values 
    (1, 'Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.',false,false,'2022-11-02 00:00:00',1,1),
    (2, 'Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.',false,false,'2022-11-02 00:00:00',2,2),
    (3, 'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.',false,false,'2022-11-02 00:00:00',3,4),
    (4, 'Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.',false,false,'2022-11-02 00:00:00',4,5),
    (5,'Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.',false,false,'2022-11-02 00:00:00',1,4);`);
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
