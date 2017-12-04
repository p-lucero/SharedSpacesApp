CREATE DATABASE if not exists test;
use test;

CREATE TABLE if not exists user_accounts(
	id int(1) not null auto_increment,
	first_name varchar(255) not null,
	last_name varchar(255) not null,
	email varchar(255) not null,
	password varchar(40) not null,
	phone_number varchar(15) not null,
	facebook_profile varchar(255),
	twitter_handle varchar(255),
	instagram varchar(255),
	group_id int(1) references groups(id) ON DELETE SET NULL,
	PRIMARY KEY(id)
)  DEFAULT CHARSET=utf8;

CREATE TABLE if not exists personal_debts(
	id int(1) not null auto_increment,
	amount float not null,
	lender_id int(1) not null REFERENCES user_accounts(id) ON DELETE CASCADE,
	borrower_id int(1) not null REFERENCES user_accounts(id) ON DELETE CASCADE,
	PRIMARY KEY (id)
)  DEFAULT CHARSET=utf8;

CREATE TABLE if not exists group_debt(
	id int(1) not null auto_increment,
	debt_type varchar(255) not null,
	amount float not null,
	group_id int(1) not null REFERENCES groups(id) ON DELETE CASCADE,
	PRIMARY KEY (id)
)  DEFAULT CHARSET=utf8;

CREATE TABLE if not exists groups(
	id int(1) not null auto_increment,
	group_name varchar(255) not null,
	ground_rules varchar(1000),
	PRIMARY KEY(id)
)  DEFAULT CHARSET=utf8;

CREATE TABLE if not exists rent(
	id int(1) not null auto_increment,
	rent_amount float not null,
	rent_paid boolean not null,
	user_id int(1) REFERENCES user_accounts(id) ON DELETE SET NULL,
	group_id int(1) not null REFERENCES groups(id) ON DELETE CASCADE,
	PRIMARY KEY(id)
) ;

CREATE TABLE if not exists chores(
	id int(1) not null auto_increment,
	chore varchar(255) not null,
	due_date date,
	chore_complete boolean not null,
	user_id int(1) REFERENCES user_accounts(id) ON DELETE SET NULL,
	group_id int(1) not null REFERENCES groups(id) ON DELETE CASCADE,
	PRIMARY KEY(id)
) DEFAULT CHARSET=utf8;

CREATE TABLE if not exists groceries(
	id int(1) not null auto_increment,
	amount_due float not null,
	paid_status boolean,
	user_id int(1) REFERENCES user_accounts(id) ON DELETE SET NULL,
	group_id int(1) not null REFERENCES groups(id) ON DELETE CASCADE,
	PRIMARY KEY(id)
) ;