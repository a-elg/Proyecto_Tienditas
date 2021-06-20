require("dotenv").config()

const { addressparser } = require("emailjs");
const mysql = require("mysql");
const users = require("./../model/User.js");

let connection = mysql.createConnection({
    user: `${process.env.mysql_user}`,
    password: `${process.env.mysql_pw}`,
    database: `${process.env.mysql_db}`
});

 function query(lit_query) {
    return new Promise(
        (resolve,reject)=>{
            try {
                connection.connect((err) => {
                    if (err) throw err;
                    connection.query(lit_query, (err, result) => {
                        if (err) throw err;
                        resolve(result);
                    });
                });
            } 
            catch (error){ 
                reject(error);
            }
        }
    );
}module.exports.query = query;

// Save entities rows________________________________________________________________________________________________________________

 async function saveCustomer(email, name, phone, password) {
    await query(`call createCustomer
        (
            '${email}',
            '${name}',
            '${phone}',
            '${password}'
        )
    `)
    .then(
        (result)=>{
            console.log("Succesfull query\nResult:");
            if(!result){
                return false;
            }
            return true;
        }
    )
    .catch(
        (result)=>{
            console.log("Error in query:");
            console.log(result);
            return false;
        }
    );

}module.exports.saveCustomer = saveCustomer;


async function saveProduct(name,price,brand,category,img_path,description){
    if (brand===undefined)
        brand=" ";
    await query(`
        insert into products(
            p_name,
            p_price,
            p_brand,
            p_category,
            p_img_path,
            p_description
        ) 
        values(
            '${name}',
            ${price},
            '${brand}',
            '${category}',
            '${img_path}',
            '${description}'
        );
    `)
    .then(
        (result)=>{
            console.log("Succesfull query\nResult:");
            if(!result){
                return false;
            }
            return true;
        }
    )
    .catch(
        (result)=>{
            console.log("Error in query:");
            console.log(result);
            return false;
        }
    );

}module.exports.saveProduct = saveProduct;

async function signinCustomer(email, password) {
    let a;
    await query(`call signinCustomer('${email}','${password}')`)
    .then(
        (result)=>{
            console.log("Succesfull query");
            if(!result){
                a= false;
            }
            a= true;
        }
    )
    .catch(
        (result)=>{
            a= false;
        }
    );
    if(a)
        a=await readCustomer(email);
    else
        a=null;
    return a;
}module.exports.signinCustomer = signinCustomer;

async function readCustomer(email) {
    await query(`call readCustomer('${email}');`)
    .then(
        (result)=>{
            console.log("Succesfull query");
            if(!result){
                return false;
            }
            console.log(result);
            result=result[0][0];
            return new users.Customer(result.c_email,result.c_name,result.c_password,"Customer",null,);
        }
    )
    .catch(
        (result)=>{
            return false;
        }
    );
}module.exports.readCustomer = readCustomer;

async function getShoppingCart(email) {
    let query_result = query(`select * from shopping_carts where c_mail=${email};`);
}
readCustomer("emmanuel@outlook.com");







// Signin_____________________________________________________________________________________________


//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------


async function signinStore(email, password) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call signinStore('${email}','${password}')`, (err, result) => {
                if (err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.signinStore = signinStore;

async function signinDelivery(email, password) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call signinDelivery('${email}','${password}')`, (err, result) => {
                if (err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.signinDelivery = signinDelivery;

async function signinAdmin(email, password) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call signinAdmin('${email}','${password}')`, (err, result) => {
                if (err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.signinAdmin = signinAdmin;

// Read____________________________________________________________________________________________


async function readDeliveryMan(email) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call readDeliveryMan('${email}')`, (err, result) => {
                if (err) throw err;
                let query_result = result[0][0];
                let user = new users.Customer(
                    query_result.dm_email,
                    query_result.dm_name,
                    query_result.dm_phone,
                    query_result.dm_rfc,
                    query_result.dm_password,
                    "delivery_men",
                    null,
                    null
                );
                return user;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.readDeliveryMan = readDeliveryMan;
// User operations_________________________________________________________________________________________________




console.log("db.js correctly set");

//insert into products (p_name,p_price,p_brand,p_category,p_img_path,p_description) values ('Paracetamol',40,'Similares','Salud','https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/4-Nitrophenol_acsv.svg/1920px-4-Nitrophenol_acsv.svg.png','Caja de paracetamol de 10 tabletas de 20gr cada una.');
//https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/4-Nitrophenol_acsv.svg/1920px-4-Nitrophenol_acsv.svg.png






/*
Queries de modificación:
    [
      [Row{col1:val1,col2:val2,...,col3:val3},Row{col1:val1,col2:val2,...,col3:val3},...,Row{col1:val1,col2:val2,...,col3:val3}], 
      OKpacket{
        affectedRows: n,
        insertId: n,
        serverStatus: n,
        warningCount: n,
        message: '',
        protocol41: bool,
        changedRows: n
      }
    ]

Quieries de consulta:
    [
        Row{col1:val1,col2:val2,...,col3:val3},
        Row{col1:val1,col2:val2,...,col3:val3},
        ...,
        Row{col1:val1,col2:val2,...,col3:val3}
    ]
*/