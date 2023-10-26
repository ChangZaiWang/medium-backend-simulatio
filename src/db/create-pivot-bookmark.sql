USE medium; 

DROP TABLE IF EXISTS bookmark_pivot; 

CREATE TABLE IF NOT EXISTS bookmark_pivot 
  ( 
     user_id     INT NOT NULL,
     story_id    INT NOT NULL,
     bookmark_id INT NOT NULL
  );