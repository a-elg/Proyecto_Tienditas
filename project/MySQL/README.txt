This system has been programmed to work with MySQL server version, therefore, you will need to start a new
console prompt and type the next lines to start the service:

Take A with the absolute address where you have installed MySQL
 and B with the absolute address to the database folder (db)

Iniciate your db set
mysqld --console --initialize --basedir=A --datadir=B

It will give you a password, save it to change it later 

Then you will need to start the service
mysqld --console --datadir=B

Try openning the client in another command prompt
mysql -u root -p dHU60nHW#0ei

and write the password previously saved.
Once done, write the next line
alter user 'root'@'localhost' identified by 'NewPassword';

	change the NewPassword string for one of your choice (do not forget to change it in the .env file in the root)

