/**Cosas por hacer
 * Controladores para cada posible operación en MYSQL
 * API imgdb
 * Añadir páginas de no se encuentra/oops
 * Mantener sesión iniciada para usuarios
 * Alaterar base de datos para la API
 * Llenar la base de datos
 * Sign in/ sing up de Customer
 * Discutir lo del Stock
 * 
 */

require("dotenv").config();
const fs = require("fs");
const express = require("express");
//const MySQL = require("./project/controller/db.js");
const app = express();
let connection_ready = false;
const mysql = require("./project/controller/db.js");

/*let con = mysql.createConnection({
    user: "root",
    password:`${process.env.mysql_pw}`,
    database:"aki"
});

con.connect((err)=>{
  if(err) throw err;
  console.log("MySQL server connected");
  connection_ready=true;
});

function query(lit_query){
  if(!connection_ready)
    return null;
  con.query(lit_query,(err,result)=>{
    if(err)throw err;
    console.log(result);
    console.log(`Result of Query: ${result.affectedRows}`);
    console.log("Query realizada");
  });
}*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./project/view"));
app.listen(process.env.port);

//Customer_______________________________________________________________
app.post("/signup", (request, response) => {
    let info = request.body;
    if (info.password !== info.vpassword)
        response.redirect("./project/view/deliverySignup.html");
    /*else
      MySQL.saveCustomer(info.email,info.name,info.phone,info.password);*/
    response.end();
});

app.post("/signin", (request, response) => {
    /*if(MySQL.signinCustomer(request.body.email,request.body.password)){
      //Correct signin
    }
    else{
      //Signin error
    }*/
    response.end();
});

//Store____________________________________________________________________
app.post("/ssignup", (request, response) => {
    let info = request.body;
    console.log(info);
    if (info.password !== info.vpassword)
        response.redirect("./project/view/storesSignup.html");
    response.end();
});

app.post("/ssignin", (request, response) => {
    console.log(request.body);
    response.end();
});

//Deliverer________________________________________________________________
app.post("/dsignup", (request, response) => {
    let info = request.body;
    console.log(info);
    if (info.password !== info.vpassword)
        response.redirect("./project/view/deliverySignup.html");

    response.end();
});

app.post("/dsignin", (request, response) => {
    let info = request.body;

    response.end();
});


//Admin____________________________________________________________________
app.post("/asignup", (request, response) => {
    console.log(request.body);
    response.end();
});

app.post("/asignin", (request, response) => {
    console.log(request.body);
    response.end();
});

//Operations_______________________________________________________________
app.post("/catalog", (request, response) => {
    console.log(request.body);
    if (request.headers.referer.includes("http://localhost:5000/home.html")) {
        response.contentType(`text/plain`);
        response.send('Catalog');
    }
    response.end();
});

//Error handling____________________________________________________________


console.log(`Server up at localhost:${process.env.port}`);
//mysql.query(`call readCustomer('coorep')`);
//MySQL.query("call signinCustomer('correo2','contrass');");