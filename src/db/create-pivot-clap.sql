USE medium; 

DROP TABLE IF EXISTS clap; 

CREATE TABLE IF NOT EXISTS clap 
  (  
     user_id      INT(11) NOT NULL,
     story_id   INT(11) NOT NULL,
     count        INT(2)  NOT NULL DEFAULT 1
  );