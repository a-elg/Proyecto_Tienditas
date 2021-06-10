drop procedure if exists readUser;
delimiter $$
create procedure readUser(
    in u_id_sp int
)
begin
	select * from usuariosspaceride where u_id = u_id_sp;
end$$
delimiter ;
drop procedure if exists updateUserData;
delimiter $$
create procedure updateUserData(
	in u_id_sp int,
    in u_nombre_sp nvarchar(255),
    in u_correo_sp nvarchar(255)
)
begin
	declare updated boolean;
	update usuariosspaceride set u_nombre = u_nombre_sp, u_correo = u_correo_sp where u_id= u_id_sp;
	set updated = true;
	select updated;
end$$
delimiter ;
drop procedure if exists updateUserPsd;
delimiter $$
create procedure updateUserPsd(
	in u_id_sp int,
    in u_contra_sp nvarchar(255)
)
begin
	declare updated boolean;
	update usuariosspaceride set u_contra = u_contra_sp where u_id= u_id_sp;
	set updated = true;
	select updated;
end$$
delimiter ;
drop procedure if exists readU_derrotasAndU_victorias;
delimiter $$
create procedure readU_derrotasAndU_victorias(
    in u_id_sp int
)
begin
	select u_derrotas, u_victorias from usuariosspaceride where u_id = u_id_sp;
end$$
delimiter ;
SET GLOBAL max_connections = 500;
SET @@session.block_encryption_mode = 'aes-256-ecb';
drop procedure if exists encryptidSR;
delimiter $$
create procedure encryptidSR(
	in id int
)
begin
	SELECT HEX(AES_ENCRYPT(id, 'spaceride_1327'));
end$$
delimiter ;
drop procedure if exists encryptSR;
delimiter $$
create procedure encryptSR(
	in st nvarchar(255)
)
begin
	SELECT HEX(AES_ENCRYPT(st, 'spaceride_1327'));
end$$
delimiter ;
drop procedure if exists decryptSR;
delimiter $$
create procedure decryptSR(
	in encrypted blob
)
begin
	SELECT AES_DECRYPT(UNHEX(encrypted),'spaceride_1327');
end$$
delimiter ;