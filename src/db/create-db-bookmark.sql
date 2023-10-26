USE medium; 

DROP TABLE IF EXISTS bookmark; 

CREATE TABLE IF NOT EXISTS bookmark 
  ( 
     id           INT PRIMARY KEY auto_increment, 
     name         VARCHAR(50) NOT NULL,
     owner_id     INT NOT NULL,
     is_private   BOOLEAN NOT NULL DEFAULT FALSE
  );