USE medium; 

DROP TABLE IF EXISTS comment; 

CREATE TABLE IF NOT EXISTS comment 
  ( 
     id           INT PRIMARY KEY auto_increment,
     content      TEXT NOT NULL,
     author_id    INT NOT NULL,
     story_id     INT NOT NULL,
     inherit      INT DEFAULT NULL,
     created_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	 update_time  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
  );