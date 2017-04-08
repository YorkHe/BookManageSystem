create table book (
    b_id int not null auto_increment,
    type char(10),
    name varchar(40),
    publisher varchar(30),
    year int,
    author varchar(20),
    price decimal(7,2),
    total int,
    instorage int,
    primary key (b_id)
);

create table reader(
    r_id int not null auto_increment,
    name varchar(10),
    organization varchar(40),
    type char(1),
    check(type = 'T' OR type = 'S'),
    primary key (r_id)
);

create table admin(
    a_id int not null auto_increment,
    name  varchar(10),
    pwd varchar(40),
    contact varchar(40),
    primary key (a_id)
);

create table borrow(
    r_id char(7),
    b_id char(8),
    borrow_date datetime,
    return_date datetime,
    a_id char(7)
);