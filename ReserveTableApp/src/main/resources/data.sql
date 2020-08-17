INSERT INTO authority (id,name) values (1,'CUSTOMER');
INSERT INTO authority (id,name) values (2,'ADMIN');
INSERT INTO authority (id,name) values (3,'WAITER');

insert into users (id,name, lastname, email, password, role,last_password_reset_date) values (-6,'admin', 'admin', 'admin@gmail.com', '$2a$10$En99NVAv.YrTtVxJ1fssBeVO4AFnfl1OMwzFbPeaDdSBm1KLUzp12', 'ADMIN','2019-12-01 09:00:01');
INSERT INTO user_authority (user_id,authority_id) values (-6,2);

insert into users (id,name, lastname, email, password, role,last_password_reset_date) values (-7,'jelena', 'bojanic', 'jelena.bojanic97@gmail.com', '$2a$10$En99NVAv.YrTtVxJ1fssBeVO4AFnfl1OMwzFbPeaDdSBm1KLUzp12', 'CUSTOMER','2019-12-01 09:00:01');
INSERT INTO user_authority (user_id,authority_id) values (-7,1);

--customers
insert into customer(id) values (-7);

--facilities
insert into facility(id,name,city,street,pet,start_time,end_time,contact_number,facility_type,table_counter) values
(-10,'Petrus','Novi Sad','Bulevar Oslobodjenja 11',false,'10:00:00','23:00:00','0641126711','RESTAURANT',3);

insert into facility(id,name,city,street,pet,start_time,end_time,contact_number,facility_type,table_counter) values
(-11,'Loft','Beograd','Bulevar Mihajla Pupina 11',true,'08:00:00','20:00:00','06280003103','CAFE',3);

insert into facility(id,name,city,street,pet,start_time,end_time,contact_number,facility_type,table_counter) values
(-13,'La torcia','Nis','Sutjeska 1',false,'10:00:00','16:00:00','021455455','RESTAURANT',3);

--tables

insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-5,true,'GARDEN',1,'SMOKING',2);
insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-6,false,'GARDEN',2,'NONSMOKING',3);
insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-7,true,'BALCONY',3,'SMOKING',2);

insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-8,true,'INSIDE',1,'NONSMOKING',4);
insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-9,false,'INSIDE',2,'NONSMOKING',2);
insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-10,false,'BALCONY',3,'SMOKING',6);

insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-11,true,'GARDEN',1,'NONSMOKING',2);
insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-12,true,'INSIDE',2,'NONSMOKING',8);
insert into tables(id,is_available,placement,table_num,zone,number_of_seats) values (-13,true,'BALCONY',3,'SMOKING',4);

--facilites-and-tables

insert into facility_tables(facility_id,table_id) values(-10,-5);
insert into facility_tables(facility_id,table_id) values(-10,-6);
insert into facility_tables(facility_id,table_id) values(-10,-7);

insert into facility_tables(facility_id,table_id) values(-11,-8);
insert into facility_tables(facility_id,table_id) values(-11,-9);
insert into facility_tables(facility_id,table_id) values(-11,-10);

insert into facility_tables(facility_id,table_id) values(-13,-11);
insert into facility_tables(facility_id,table_id) values(-13,-12);
insert into facility_tables(facility_id,table_id) values(-13,-13);

---reservations

insert into reservation(id,start_reservation,customer_id,duration,reservation_date) values
(-5,'10:30:00',-7,30,'2020-08-17');

insert into reservation(id,start_reservation,customer_id,duration,reservation_date) values
(-6,'21:30:00',-7,60,'2020-08-17');

--customer-reservations

insert into customer_reservations(customer_id,reservations_id) values (-7,-5);
insert into customer_reservations(customer_id,reservations_id) values (-7,-6);

--tables-reservation

insert into reservation_tables(reservation_id,table_id) values(-5,-5);
insert into  reservation_tables(reservation_id,table_id) values(-6,-5);

--facilites-reservations

insert into facility_reservations(facility_id,reservation_id) values (-10,-5);
insert into facility_reservations(facility_id,reservation_id) values (-10,-6);