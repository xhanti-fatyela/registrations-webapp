create table reg_town(
    id serial not null primary key,
    name_of_town text not null,
    town_code text not null
);
create table reg_numbers(
    id serial not null primary key,
    town_id int,
    reg varchar not null,
    foreign key (town_id) references reg_town(id)

);

 insert into reg_town (name_of_town, town_code) values ('Cape Town', 'CA');
 insert into reg_town (name_of_town, town_code) values ('Malmesbury', 'CK');
 insert into reg_town (name_of_town, town_code) values ('Bellville', 'CY');
 