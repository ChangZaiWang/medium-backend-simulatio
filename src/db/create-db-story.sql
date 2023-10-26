  USE medium; 

DROP TABLE IF EXISTS article; 

CREATE TABLE IF NOT EXISTS article 
  ( 
     id           INT PRIMARY KEY auto_increment, 
     title        VARCHAR(255) NOT NULL, 
     content      TEXT NOT NULL, 
     author_id    INT NOT NULL,
     is_premium   BOOLEAN NOT NULL DEFAULT FALSE,
     created_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	   update_time  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
  );