create database aki;
use aki; 

create table app_admin(
  aa_email nvarchar(255) not null,
  aa_name nvarchar(255) not null,
  aa_gain int unsigned not null,
  aa_password nvarchar(255) not null,
  primary key (aa_email)
);

create table customers(
  c_email nvarchar(255) not null,
  c_name nvarchar(255) not null,
  c_phone nvarchar (13) not null,
  c_password nvarchar(255) not null,
  primary key (c_email)
);

create table delivery_men(
  dm_email nvarchar (255) not null,
  dm_name nvarchar (255) not null,
  dm_phone nvarchar (13) not null,
  dm_password nvarchar (255) not null,
  dm_rfc nvarchar(10) not null,

  primary key (dm_email)
);

create table store_admin(
  sa_email nvarchar(255) not null,
  sa_name nvarchar(255) not null,
  sa_phone nvarchar(13) not null,
  sa_password nvarchar(255) not null,
  sa_rfc nvarchar(10) not null,
  
  primary key (sa_email)
);

create table products(
  p_id int unsigned not null auto_increment,
  p_name nvarchar(255) not null,
  p_price int unsigned not null,
  p_brand nvarchar(255),
  p_category nvarchar(255) not null,
  p_img_path nvarchar(255),
  p_description nvarchar(255),
  
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
  sa_email nvarchar (13),
  i_id int unsigned,
  hc_id int unsigned,
  s_address nvarchar(255) not null,
  s_phone nvarchar(13) not null,
  s_schedule nvarchar(255) not null,

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
  dm_email nvarchar (255),
  o_date date not null,
  o_status tinyint unsigned not null,
  o_cost int unsigned not null,
  o_delivery_address nvarchar (255) not null,

  primary key (o_id),

  constraint fk_o_dm
    foreign key(dm_email) 
    references delivery_men(dm_email)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table shopping_carts(
  c_email nvarchar (255),
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
  c_email nvarchar (255),
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
  dm_email nvarchar (255),
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
  r_opinon nvarchar(255),

  constraint fk_r_p
    foreign key(p_id) 
    references products(p_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);





drop procedure if exists createCustomer;
delimiter $$
create procedure createCustomer(
    in c_email_sp nvarchar(255),
    in c_name_sp nvarchar(255),
    in c_phone_sp nvarchar(13),
    in c_psswd_sp nvarchar(255)
)
begin
	declare created boolean;
	declare exist int;
	set exist = (select count(*) from customers where u_contra=u_contra_sp);
    if(exist = 0)
		then
			insert into customers values(c_email_sp, c_name_sp, c_phone_sp, c_psswd_sp);
      set created = true;
		else
      set created = false;
	end if;
  select created;
end$$
delimiter ;



drop procedure if exists signinCustomer;
delimiter $$
create procedure signinCustomer(
    in u_email_sp nvarchar(255),
    in u_psswd_sp nvarchar(255)
)
begin
	declare casesignin int;
	declare name_sp nvarchar(255);
	set name_sp = (select customers.c_name from customers where c_email = u_email_sp and c_password = u_psswd_sp);
    if name_sp is null
		then
			set name_sp = (select customers.c_name from customers where c_email = u_email_sp);
      if name_sp is null
				then
					set name_sp = "";
          set casesignin = 0;
				else
					set casesignin = 2;
			end if;
		else
			set casesignin = 1;
	end if;
    select name_sp, casesignin;
end$$
delimiter ;




drop procedure if exists signinStore;
delimiter $$
create procedure signinStore(
    in u_email_sp nvarchar(255),
    in u_psswd_sp nvarchar(255)
)
begin
	declare casesignin int;
	declare name_sp nvarchar(255);
	set name_sp = (select store_admin.sa_name from store_admin where sa_email = u_email_sp and sa_password = u_psswd_sp);
    if name_sp is null
		then
			set name_sp = (select store_admin.sa_name from store_admin where sa_email = u_email_sp);
      if name_sp is null
				then
					set name_sp = "";
          set casesignin = 0;
				else
					set casesignin = 2;
			end if;
		else
			set casesignin = 1;
	end if;
    select name_sp, casesignin;
end$$
delimiter ;




drop procedure if exists signinDelivery;
delimiter $$
create procedure signinDelivery(
    in u_email_sp nvarchar(255),
    in u_psswd_sp nvarchar(255)
)
begin
	declare casesignin int;
	declare name_sp nvarchar(255);
	set name_sp = (select delivery_men.dm_name from delivery_men where dm_email = u_email_sp and dm_password = u_psswd_sp);
    if name_sp is null
		then
			set name_sp = (select delivery_men.sa_name from delivery_men where dm_email = u_email_sp);
      if name_sp is null
				then
					set name_sp = "";
          set casesignin = 0;
				else
					set casesignin = 2;
			end if;
		else
			set casesignin = 1;
	end if;
    select name_sp, casesignin;
end$$
delimiter ;




drop procedure if exists signinAdmin;
delimiter $$
create procedure signinAdmin(
    in u_email_sp nvarchar(255),
    in u_psswd_sp nvarchar(255)
)
begin
	declare casesignin int;
	declare name_sp nvarchar(255);
	set name_sp = (select app_admin.aa_name from app_admin where aa_email = u_email_sp and aa_password = u_psswd_sp);
    if name_sp is null
		then
			set name_sp = (select app_admin.aa_name from app_admin where aa_email = u_email_sp);
      if name_sp is null
				then
					set name_sp = "";
          set casesignin = 0;
				else
					set casesignin = 2;
			end if;
		else
			set casesignin = 1;
	end if;
    select name_sp, casesignin;
end$$
delimiter ;




drop procedure if exists readCustomer;
delimiter $$
create procedure readCustomer(
    in u_id_sp nvarchar(255)
)
begin
	select * from customers where c_email = u_id_sp;
end$$
delimiter ;




drop procedure if exists readDeliveryMan;
delimiter $$
create procedure readDeliveryMan(
    in u_id_sp nvarchar(255)
)
begin
	select * from delivery_men where dm_email = u_id_sp;
end$$
delimiter ;




drop procedure if exists readSAdmin;
delimiter $$
create procedure readSAdmin(
    in u_id_sp nvarchar(255)
)
begin
	select * from store_admin where sa_email = u_id_sp;
end$$
delimiter ;




drop procedure if exists readAdmin;
delimiter $$
create procedure readAdmin(
    in u_id_sp nvarchar(255)
)
begin
	select * from app_admin where aa_email = u_id_sp;
end$$
delimiter ;




drop procedure if exists updateCustomer;
delimiter $$
create procedure updateCustomer(
    in u_name_sp nvarchar(255),
    in u_phone_sp nvarchar(13),
    in u_psswd_sp nvarchar(255),
    in u_mail_sp nvarchar(255)
)
begin
	declare updated boolean;
  declare name_sp nvarchar(255);
  set name_sp = (select customers.c_name from customers where c_email = u_mail_sp);
      if name_sp is null
				then
					set name_sp = "";
          set updated = false;
				else
          update customers set c_email = u_mail_sp, c_name = u_name_sp, c_password = u_psswd_sp, c_phone = u_phone_sp where c_email = u_email_sp;
					set updated = true;
			end if;
	select updated;
end$$
delimiter ;




drop procedure if exists updateDeliveryMan;
delimiter $$
create procedure updateDeliveryMan(
    in u_name_sp nvarchar(255),
    in u_phone_sp nvarchar(13),
    in u_psswd_sp nvarchar(255),
    in u_mail_sp nvarchar(255)
)
begin
	declare updated boolean;
  declare name_sp nvarchar(255);
  set name_sp = (select delivery_men.dm_name from delivery_men where dm_email = u_mail_sp);
      if name_sp is null
				then
					set name_sp = "";
          set updated = false;
				else
          update delivery_men set dm_email = u_mail_sp, dm_name = u_name_sp, dm_password = u_psswd_sp, dm_phone = u_phone_sp where dm_email = u_email_sp;
					set updated = true;
			end if;
	select updated;
end$$
delimiter ;




drop procedure if exists updateAdmin;
delimiter $$
create procedure updateAdmin(
    in u_name_sp nvarchar(255),
    in u_psswd_sp nvarchar(255),
    in u_mail_sp nvarchar(255),
    in aa_gain_sp int unsigned
)
begin
	declare updated boolean;
  declare name_sp nvarchar(255);
  set name_sp = (select app_admin.aa_name from app_admin where aa_email = u_mail_sp);
      if name_sp is null
				then
					set name_sp = "";
          set updated = false;
				else
          update app_admin set aa_email = u_mail_sp, aa_name = u_name_sp, aa_password = u_psswd_sp, aa_gain = aa_gain_sp where aa_email = u_mail_sp;
					set updated = true;
			end if;
	select updated;
end$$
delimiter ;




drop procedure if exists updateSAdmin;
delimiter $$
create procedure updateSAdmin(
    in u_name_sp nvarchar(255),
    in u_phone_sp nvarchar(13),
    in u_psswd_sp nvarchar(255),
    in u_mail_sp nvarchar(255)
)
begin
	declare updated boolean;
  declare name_sp nvarchar(255);
  set name_sp = (select store_admin.sa_email from store_admin where sa_email = u_mail_sp);
      if name_sp is null
				then
					set name_sp = "";
          set updated = false;
				else
          update store_admin set sa_email = u_mail_sp, sa_name = u_name_sp, sa_password = u_psswd_sp, sa_phone = u_phone_sp where sa_email = u_email_sp;
					set updated = true;
			end if;
	select updated;
end$$
delimiter ;




SET GLOBAL max_connections = 500;
SET @@session.block_encryption_mode = 'aes-256-ecb';
drop procedure if exists encrypt;
delimiter $$
create procedure encrypt(
	in str nvarchar(255)
)
begin
	SELECT HEX(AES_ENCRYPT(str, 'a1k5i9_1327'));
end$$
delimiter ;




drop procedure if exists decryptstr;
delimiter $$
create procedure decryptstr(
	in encrypted blob
)
begin
	SELECT AES_DECRYPT(UNHEX(encrypted),'spaceride_1327');
end$$
delimiter ;
