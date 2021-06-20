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
  p_price FLOAT(3,2) not null,
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
  s_id int unsigned,
  p_id int unsigned,
  i_quantity int unsigned not null,

  constraint fk_i_p
    foreign key(p_id) 
    references products(p_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
  
  constraint fk_s_id
    foreign key(s_id) 
    references stores(s_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);

create table stores(
  s_id int unsigned not null auto_increment,  
  sa_email nvarchar (255),
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
  s_id int unsigned not null,

  constraint fk__op_p
    foreign key(p_id) 
    references products(p_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk__op_o
    foreign key(o_id) 
    references orders(o_id)
    ON DELETE CASCADE  
    ON UPDATE CASCADE,

  constraint fk_op_s
    foreign key(s_id) 
    references stores(s_id)
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
	set exist = (select count(*) from customers where c_password=c_psswd_sp);
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

-- app admin -> aa_email 255, aa_name 255, aa_gain uint, aa_password 255,
insert into app_admin values('psan@mail.com', 'Pedro Sanchez', '777', 'psan123');
insert into app_admin values('mmej@mail.com', 'Monica Mejia', '200', 'mmej321');
insert into app_admin values('rgra@mail.com', 'Roberto Gracia', '1023', 'rgra666');
insert into app_admin values('rrr@mail.com', 'Roberto Ramires Rocha', '10200', 'DieguitoMaradona');
insert int app_admin values('hladrielfermin11@yopmail.com ','Adriel Fermin Fernández Chokri','32144','l75180h7l');

-- customers -> c_email 255, c_name 255,c_phone 13, c_password 255
insert into customers values('mrbuyer@mail.com', 'Rigoberto Guardado', '525549302112', 'mcdinerox3');
insert into customers values('mcqueenrayo@mail.com', 'Marcelo Reina', '525538382972', '12345jeje');
insert into customers values('licpugberto@mail.com', 'Alberto Del Rio Sanchez', '525538382975', 'vivalospug5');
insert into customers values('almonez@mail.com', 'Alex Montes Gomez', '525538382932', '312452jjdks1');
insert into customers values('ecbergon2@yopmail.com', 'Asunción Messeguer Bergon', '4449668226', 'c62994e4c');

-- delivery_men  -> dm_email 255, dm_name 255, dm_phone 13, dm_password 255, dm_rfc 10
insert into delivery_men values('byhuerta24@yopmail.com','Cesar López Huerta','7375772765','y56587b1y','LEHC700922261');
insert into delivery_men values('gvmorientes21@yopmail.com','Estibaliz Dotras Morientes','0506004474','v476110g6v','DOME860811QA4');
insert into delivery_men values('erana17@yopmail.com ','Ana Tran Abietar','4342998120','r02204e4r','TAAA960208SE4');
insert into delivery_men values('hahipolito0@yopmail.com','Hipolito Rebordosa Jusue','4348226608','a80854h7a','REJH730501GW9');
insert into delivery_men values('dktiburciofelipe10@yopmail.com','Tiburcio Felipe Peci Bolbos','2426556047','k74652d3k','PEBT750520ARA');

-- store_admin -> sa_email 255, sa_name 255,  sa_phone 13, sa_password 255, sa_rfc 10
insert into store_admin values('gqarnoldo16@yopmail.com', 'Arnoldo Wahbi Mena', '1316995834', 'q43691g6q', 'WAMA940809JWA');
insert into store_admin values('ghfarhat7@yopmail.com', 'Isidora Evelina Fajin Farhat', '1417443279', 'h97731g6h', 'FAFI750918FC1');
insert into store_admin values('ioabelmartin14@yopmail.com', 'Abel Martín Ayude Slavov', '9592996274', 'o472109i8o', 'AUSA90110898A');
insert into store_admin values('jfamaranatalia5@yopmail.com', 'Amara Natalia Eyre Viva', '0502559912', 'f21200j9f', 'EEVA760519CI0');
insert into store_admin values('bnasuncion13@yopmail.com', 'Asunción Fulleda Ricos', '5356224735', 'n53605b1n', 'FURA9811182K5');


-- products -> p_id  auto_increment int unsigned, p_name 255, p_price int, p_brand 255,
-- p_category 255, p_img_path 255,p_description 255

insert into products (p_name, p_price, p_brand, p_category, p_img_path, p_description) 
values('Agua de manantial Sta. María 4L', 17, 'Sta. María', 'Bebidas y Licores', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750105923677L.jpg', 'Sta. María se embotella desde la fuente y esto le permite conservar sus características naturales y mantenerse intacta, ya que nace en una reserva natural protegida al pie del volcán Iztaccíhuatl, donde de manera natural se purifica.');
insert into products (p_name, p_price, p_brand, p_category, p_img_path, p_description) 
values('Refresco Coca Cola botella de 600 ml', 16, 'Coca Cola', 'Bebidas y Licores', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00000007500761L.jpg', 'Acompaña tus alimentos preferidos o sacia tu antojo con una Coca Cola, bébela bien fría.
• Sabor original
• Práctica presentación pet 600 ml
• Aporta 252 kcal');
insert into products (p_name, p_price, p_brand, p_category, p_img_path, p_description) 
values('Papas Sabritas Original original 160 g', 41, 'Sabritas', 'Botanas y Fruta seca', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750101113388L.jpg', 'Disfruta tus papas Sabritas originales, en cualquier lugar y a cualquier hora del día! ¡Compártelas con quien tú quieras!
- Sólo 3 ingredientes: papa, aceite y sal
- Tamaño familiar
- Snack crujiente');
insert into products (p_name, p_price, p_brand, p_category, p_img_path, p_description) 
values('Pan tostado Bimbo clásico 270 g', 33, 'Bimbo', 'Pan y tortillas', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750103049766L.jpg', 'Empieza tus días de la mejor forma con una rebanada de pan tostado Bimbo clásico en tu desayuno, es perfecto para acompañar tu café, y para darte toda la energía que necesitas. Encuéntralo en su presentación de 270 g.');
insert into products (p_name, p_price, p_brand, p_category, p_img_path, p_description) 
values('Mole rojo Doña María en pasta 235 g', 24, 'Doña Maria', 'Especias y Sazonadores', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750100315023L.jpg', 'Mole Doña María preserva la receta tradicional. Contiene una mezcla de chiles y especias, cacao, ajonjolí y cacahuate, lo que le da ese rico sabor. Prepara tus platillos incorporando esta deliciosa pasta, tendrá un toque muy mexicano.
•Ingredientes naturales
•Mole en pasta ideal para agregar tu sazón
• Ideal para proteínas como pollo o carne');
insert into products (p_name, p_price, p_brand, p_category, p_img_path, p_description) 
values('Café soluble Nescafé estilo café de olla 170 g', 47, 'Nescafe', 'Cafe y solubles', 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750105861891L.jpg', 'Nescafé de olla es el café soluble ideal para disfrutar al instante en cualquier momento del día. Delicioso café instantáneo hecho en México que rescata la tradicional receta del café de olla.
• Mezcla de granos de café robusta
• Con caramelo, sabor a canela y piloncillo
• Soluble');
-- health_certificate -> hc_id int unsigned, hc_last_inspection date not null.
insert into health_certificate values('123', '2021-06-19');
insert into health_certificate values('3214', '2020-08-09');
insert into health_certificate values('1321', '2019-03-11');
insert into health_certificate values('5435', '2021-03-29');
insert into health_certificate values('163', '2020-02-01');

-- stores -> s_id auto_increment int, FK(store_admin) sa_email 13, i_id int unsigned, hc_id int unsigned, s_address 255,
-- s_phone 13, s_schedule 255
--   constraint fk_s_i
--     foreign key(i_id) 
--     references inventories(i_id)
--     ON DELETE CASCADE  
--     ON UPDATE CASCADE,
 
--   constraint fk_s_hc
--     foreign key(hc_id) 
--     references health_certificate(hc_id)
--     ON DELETE CASCADE  
--     ON UPDATE CASCADE
-- -- );  
-- insert into app_admin values('jsuarez@gmail.com', 'Jose Juan SE', '777', 'porDieguitoMaradona');


-- -- inventories -> i_id int unsigned not null auto_increment, p_id int unsigned, i_quantity int unsigned not null,
-- insert into inventories (p_id, i_quantity) values(1, 15);

-- -- orders
-- insert into app_admin values('jsuarez@gmail.com', 'Jose Juan SE', '777', 'porDieguitoMaradona');

-- -- shopping_carts
-- insert into app_admin values('jsuarez@gmail.com', 'Jose Juan SE', '777', 'porDieguitoMaradona');

-- -- orders_histories
-- insert into app_admin values('jsuarez@gmail.com', 'Jose Juan SE', '777', 'porDieguitoMaradona');

-- -- balance
-- insert into app_admin values('jsuarez@gmail.com', 'Jose Juan SE', '777', 'porDieguitoMaradona');

-- -- ordered_products
-- insert into app_admin values('jsuarez@gmail.com', 'Jose Juan SE', '777', 'porDieguitoMaradona');

-- -- review
-- insert into app_admin values('jsuarez@gmail.com', 'Jose Juan SE', '777', 'porDieguitoMaradona');