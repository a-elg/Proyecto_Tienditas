create database aki;
use aki; 

create table app_admin(
  aa_email varchar(255) not null,
  aa_name varchar(255) not null,
  aa_gain int unsigned not null,
  
  primary key (aa_email)
);

create table customers(
  c_email varchar(255) not null,
  c_name varchar(255) not null,
  c_phone varchar (13) not null,
  c_password varchar(255) not null,
  primary key (c_email)
);

create table delivery_men(
  dm_email varchar (255) not null,
  dm_name varchar (255) not null,
  dm_phone varchar (13) not null,
  dm_password varchar (255) not null,
  dm_rfc varchar(10) not null,

  primary key (dm_email)
);

create table store_admin(
  sa_email varchar(255) not null,
  sa_name varchar(255) not null,
  sa_phone varchar(13) not null,
  sa_password varchar(255) not null,
  sa_rfc varchar(10) not null,
  
  primary key (sa_email)
);

create table products(
  p_id int unsigned not null auto_increment,
  p_name varchar(255) not null,
  p_price int unsigned not null,
  p_brand varchar(255),
  p_category varchar(255) not null,
  p_description varchar(255),
  
  primary key (p_id)
);

create table health_certificate(
  hc_id int unsigned not null,
  hc_last_inspection date not null,
    
  primary key (hc_id)
);

create table inventories(
  i_id int unsigned not null auto_increment,
  p_id int unsigned,
  i_quantity int unsigned not null,

  primary key (i_id),

  constraint fk_i_p
    foreign key(p_id) 
    references products(p_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table stores(
  s_id int unsigned not null auto_increment,  
  sa_email varchar (13),
  i_id int unsigned,
  hc_id int unsigned,
  s_address varchar(255) not null,
  s_phone varchar(13) not null,
  s_schedule varchar(255) not null,

  primary key (s_id),

  constraint fk_s_sa
    foreign key(sa_email) 
    references store_admin(sa_email)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk_s_i
    foreign key(i_id) 
    references inventories(i_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk_s_hc
    foreign key(hc_id) 
    references health_certificate(hc_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);  

create table orders(
  o_id int unsigned not null auto_increment,
  dm_email varchar (255),
  o_date date not null,
  o_status tinyint unsigned not null,
  o_cost int unsigned not null,
  o_delivery_address varchar (255) not null,

  primary key (o_id),

  constraint fk_o_dm
    foreign key(dm_email) 
    references delivery_men(dm_email)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table shopping_carts(
  c_email varchar (255),
  p_id int unsigned,
  sc_addition_date date not null,
  sc_quantity int unsigned not null,

  constraint fk_sc_c
    foreign key(c_email) 
    references customers(c_email)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk_sc_p
    foreign key(p_id) 
    references products(p_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table orders_histories(
  c_email varchar (255),
  o_id int unsigned,

  constraint fk_oh_c
    foreign key(c_email) 
    references customers(c_email)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk_oh_o
    foreign key(o_id) 
    references orders(o_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table balance(
  dm_email varchar (255),
  o_id int unsigned,
  b_gain int unsigned not null,

  constraint fk_b_dm
    foreign key(dm_email) 
    references delivery_men(dm_email)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk_b_o
    foreign key(o_id) 
    references orders(o_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table ordered_products(
  o_id int unsigned,
  p_id int unsigned,
  op_quantity int unsigned not null,

  constraint fk__op_p
    foreign key(p_id) 
    references products(p_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk__op_o
    foreign key(o_id) 
    references orders(o_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table review(
  p_id int unsigned,
  r_grade tinyint unsigned not null,
  r_opinon varchar(255),

  constraint fk_r_p
    foreign key(p_id) 
    references products(p_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

