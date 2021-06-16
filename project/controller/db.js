require("dotenv").config()

const mysql=require("mysql");
const users=require("./../model/User.js");

let connection = mysql.createConnection({
    user:`${process.env.mysql_user}`,
    password:`${process.env.mysql_pw}`,
    database:`${process.env.mysql_db}`
});

function query(lit_query){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            console.log("Sucesfully connected to server.");
            connection.query(lit_query,(err,result)=>{
                if(err) throw err;
                console.log(`Result:`);
                console.log(result);
                return 
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
    }   
}module.exports.query=query;


// Save user________________________________________________________________________________________________________________
function saveCustomer(email,name,phone,password){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call createCustomer('${email}','${name}','${phone}','${password}')`,(err,result)=>{
                if(err) throw err;
                return result[0][0].created;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
    }   
}module.exports.saveCustomer=saveCustomer;


// Signin_____________________________________________________________________________________________
function signinCustomer(email,password){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call signinCustomer('${email}','${password}')`,(err,result)=>{
                if(err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }   
}module.exports.signinCustomer=signinCustomer;

function signinStore(email,password){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call signinStore('${email}','${password}')`,(err,result)=>{
                if(err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }    
}module.exports.signinStore=signinStore;

function signinDelivery(email,password){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call signinDelivery('${email}','${password}')`,(err,result)=>{
                if(err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }    
}module.exports.signinDelivery=signinDelivery;

function signinAdmin(email,password){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call signinAdmin('${email}','${password}')`,(err,result)=>{
                if(err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }    
}module.exports.signinAdmin=signinAdmin;

// Read____________________________________________________________________________________________
function readCustomer(email){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call readCustomer('${email}')`,(err,result)=>{
                if(err) throw err;
                let query_result=result[0][0];
                let user=new users.Customer(
                        query_result.c_email,
                        query_result.c_name,
                        query_result.c_password,
                        "customer",
                        null,

                    );
                return user;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    } 
}module.exports.readCustomer=readCustomer;


query(`call readCustomer('correo2')`);


// User operations_________________________________________________________________________________________________

function getShoppingCart(email){
    let query_result=query(`select * from shopping_carts where c_mail=${email};`);
}


console.log("db.js correctly set");











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