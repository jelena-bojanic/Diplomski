INSERT INTO authority (id,name) values (1,'CUSTOMER');
INSERT INTO authority (id,name) values (2,'ADMIN');
INSERT INTO authority (id,name) values (3,'WAITER');

insert into users (id,name, lastname, email, password, role,last_password_reset_date) values (-6,'admin', 'admin', 'admin@gmail.com', '$2a$10$En99NVAv.YrTtVxJ1fssBeVO4AFnfl1OMwzFbPeaDdSBm1KLUzp12', 'ADMIN','2019-12-01 09:00:01');
INSERT INTO user_authority (user_id,authority_id) values (-6,2);

--facilities
insert into facility(id,name,city,street,pet,start_time,end_time,contact_number,facility_type) values
(-10,'Petrus','Novi Sad','Bulevar Oslobodjenja 11',false,'10:00:00','20:00:00','0641126711','RESTAURANT');

insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-5,true,'GARDEN',1,'SMOKING',-10);
insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-6,false,'GARDEN',2,'NONSMOKING',-10);
insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-7,true,'BALCONY',3,'SMOKING',-10);

insert into facility(id,name,city,street,pet,start_time,end_time,contact_number,facility_type) values
(-11,'Loft','Beograd','Bulevar Mihajla Pupina 11',true,'08:00:00','20:00:00','06280003103','CAFE');

insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-8,true,'INSIDE',1,'NONSMOKING',-11);
insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-9,false,'INSIDE',2,'NONSMOKING',-11);
insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-10,false,'BALCONY',3,'SMOKING',-11);

insert into facility(id,name,city,street,pet,start_time,end_time,contact_number,facility_type) values
(-13,'La torcia','Nis','Sutjeska 1',false,'10:00:00','16:00:00','021455455','RESTAURANT');

insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-11,true,'GARDEN',1,'NONSMOKING',-13);
insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-12,true,'INSIDE',2,'NONSMOKING',-13);
insert into tables(id,is_available,placement,table_num,zone,facility_id) values (-13,true,'BALCONY',3,'SMOKING',-13);

