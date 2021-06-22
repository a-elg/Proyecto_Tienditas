/**Cosas por hacer
 * Controladores para cada posible operación en MYSQL
 * API imgdb
 * Mantener sesión iniciada para usuarios
 * Alaterar base de datos para la API
 * 
 */

require("dotenv").config();
const fs = require("fs");
const express = require("express");
const session = require('express-session');
const MySQL = require("./project/controller/db.js");
const app = express();
let connection_ready = false;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./project/view"));
app.use(session({
    secret: 'akisessionjsjs',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.listen(process.env.port);

//Customer_______________________________________________________________
app.post("/signup", async(request, response) => {
    console.log(request.body);
    let data = { registred: false };
    response.contentType("application/json");
    if (request.body.email == "" ||  request.body.password == "" ||  request.body.name == "" ||  request.body.tel == "")
        response.status(400);
    else {
        data.registred = await MySQL.createCustomer(request.body.email, request.body.name, request.body.tel, request.body.password);
        (data.registred) ? response.status(200): response.status(200);
        if (data.registred) data.u_name = await MySQL.readCustomer(request.body.email).c_name;
    }
    response.send(data);
    response.end();
});

app.post("/signin", async(request, response) => {
    let data = { u_name: "", case: 0 };
    response.contentType("application/json");
    if (request.body.email == "" ||  request.body.password == "") {
        response.status(400);
        response.send(data);
    } else {
        let signin = await MySQL.signinCustomer(request.body.email, request.body.password);
        data.u_name = signin.name;
        data.case = signin.casesignin;
        response.status(200);
        response.send(data);
    }
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
    response.redirect("/stores.html");
    response.end();
});

//Operations_______________________________________________________________
app.post("/catalog", async(request, response) => {
    let catalogJSON = [];
    response.contentType("application/json");
    if (request.headers.referer.includes(`http://${process.env.domain}/home.html`) || request.headers.referer.includes("http://127.0.0.1:5000/home.html")) {
        console.log(request.body);
        if (request.body.count != undefined || !isNaN(Number(request.body.count))) {
            catalogJSON = await MySQL.getCatalog(request.body.count);
        }
        //catalogJSON = '[{"sku": 1, "name":"Awa del bicho", "brand": "Bicho", "price":20.0, "desc": "Coca cola no, awa como el bicho", "img_path": "https://i0.wp.com/noticieros.televisa.com/wp-content/uploads/2021/06/memes-ronaldo-coca-2.png?resize=550%2C559&ssl=1"}, {"sku": 2, "name":"Awa del bicho 2", "brand": "Bicho", "price":25.0, "desc": "Coca cola no, awa como el bicho 2", "img_path": "https://i0.wp.com/noticieros.televisa.com/wp-content/uploads/2021/06/memes-ronaldo-coca-2.png?resize=550%2C559&ssl=1"}]';
    } else response.redirect('/oops.html');
    response.send(catalogJSON);
    response.end();
});

app.post("/session", (request, response) => {
    console.log(request.session);
    response.contentType("application/json");
    email = { u_email: "" };
    if (request.session.u_email) email = { u_email: request.session.u_email };
    response.send(email);
    response.end();
});

app.post("/psswdrcvr", async(request, response) => {

});



//__________________________________________________________________________
app.get("/test", async(req, res) => {
    console.log("Beggining test");
    res.write("Prueba");
    console.log("->");
    let Test_res;
    await MySQL.createProduct("Awa de owo", 69, "Uwuntu", "Cosas lindas", "https://pbs.twimg.com/profile_images/1371949362675380231/NZgSFoMG_400x400.jpg", "Rica awa de owo con sabor a uwu", 1, "ioabelmartin14@yopmail.com").then(
            (res) => {
                Test_res = res;
                console.log("A asignada");
            })
        /* 
        "gqarnoldo16@yopmail.com","s"
        "byhuerta24@yopmail.com", "dm"
        "mrbuyer@mail.com", "c"
        */
    console.log("<-\nTest_res:");
    console.log(Test_res);
    res.end();
    console.log("End of test");
    //insert into products (p_name, p_price,p_brand,p_category,p_img_path,p_description) values ('Awa de owo',15,'UwUntu','Awuitas locas','https://res.cloudinary.com/walmart-labmg_large/00750105923677L.jpg','Una rica awita de owo... uwu');
});

console.log(`Server up at localhost:${process.env.port}`);
//mysql.query(`call readCustomer('coorep')`);
//MySQL.query("call signinCustomer('correo2','contrass');");

//Error handling____________________________________________________________

app.get("*", (request, response) => {
    response.status(404).redirect("/notFound.html");
    response.end();
});