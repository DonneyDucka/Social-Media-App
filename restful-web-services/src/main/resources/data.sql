DROP TABLE IF EXISTS rmit_user;



--Create table for users and which roles they have


--Create table for users
CREATE TABLE rmit_user (
    user_id varchar(8),
    user_name varchar(25),
    password varchar(25),
    PRIMARY KEY (user_id)
);


-- insert into todo(id, username,description,target_date,is_done)
-- values(10001, 'sept', 'Learn JPA', sysdate(), false);

-- insert into todo(id, username,description,target_date,is_done)
-- values(10002, 'sept', 'Learn Data JPA', sysdate(), false);

-- insert into todo(id, username,description,target_date,is_done)
-- values(10003, 'sept', 'Learn Microservices', sysdate(), false);