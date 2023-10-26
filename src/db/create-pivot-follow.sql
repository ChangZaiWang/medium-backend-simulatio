USE medium; 

DROP TABLE IF EXISTS follow; 

CREATE TABLE IF NOT EXISTS follow 
  (  
    follower_id  INT(11) NOT NULL,
    follow_id    INT(11) NOT NULL
  );