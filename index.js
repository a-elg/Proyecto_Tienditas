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
const MySQL = require("./project/controller/db.js");
const app = express();
let connection_ready = false;

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
app.post("/catalog", async (request, response) => {
    if (request.headers.referer.includes("http://localhost:5000/home.html")) {
      //quiero el arreglo de productos (los primeros 25) como cadena JSON
      //se lo mando
      let objchido = request.body;
      console.log(objchido);
      //0,1,2,3,4,5;
      let catalogJSON;


      await MySQL.getCatalog(request.body.count).then((param)=>{
          console.log(param);
        catalogJSON=JSON.stringify(param);
        console.log(catalogJSON);
        console.log("BEFORE SENDING, ARRAY DISPLAYS ON TOP");
        catalogJSON = '[{"sku": 1, "name":"Awa del bicho", "brand": "Bicho", "price":20.0, "desc": "Coca cola no, awa como el bicho", "img_path": "https://i0.wp.com/noticieros.televisa.com/wp-content/uploads/2021/06/memes-ronaldo-coca-2.png?resize=550%2C559&ssl=1"}, {"sku": 2, "name":"Awa del bicho 2", "brand": "Bicho", "price":25.0, "desc": "Coca cola no, awa como el bicho 2", "img_path": "https://i0.wp.com/noticieros.televisa.com/wp-content/uploads/2021/06/memes-ronaldo-coca-2.png?resize=550%2C559&ssl=1"}]';
        response.contentType("application/json");
        response.send(catalogJSON);
        response.end();
        console.log("RESPONSE ENDED");
      }).catch(resp=>console.log("kha"));

      /*catalogJSON = await MySQL.getCatalog(request.body.count);
      console.log(catalogJSON);
      console.log("BEFORE SENDING, ARRAY DISPLAYS ON TOP");
      //catalogJSON = '[{"sku": 1, "name":"Awa del bicho", "brand": "Bicho", "price":20.0, "desc": "Coca cola no, awa como el bicho", "img_path": "https://i0.wp.com/noticieros.televisa.com/wp-content/uploads/2021/06/memes-ronaldo-coca-2.png?resize=550%2C559&ssl=1"}, {"sku": 2, "name":"Awa del bicho 2", "brand": "Bicho", "price":25.0, "desc": "Coca cola no, awa como el bicho 2", "img_path": "https://i0.wp.com/noticieros.televisa.com/wp-content/uploads/2021/06/memes-ronaldo-coca-2.png?resize=550%2C559&ssl=1"}]';
      response.contentType("application/json");
      response.send(catalogJSON);
      response.end();
      console.log("RESPONSE ENDED");
      */
      //readAllCatalog first 25 elements
    }
    else
      response.end();
});

//Error handling____________________________________________________________


console.log(`Server up at localhost:${process.env.port}`);
//mysql.query(`call readCustomer('coorep')`);
//MySQL.query("call signinCustomer('correo2','contrass');");