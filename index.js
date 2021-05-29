require("dotenv").config();//variables de entorno

//const mysql=require("mysql");
const fs=require("fs");
const express=require("express");
const servidor=express();//nuestro servidor funcionará con express

servidor.listen(process.env.puerto);

servidor.get("/",(peticion,respuesta)=>{
    console.log("Alguien ingresó a la pag principal");
    respuesta.write(fs.readFileSync(`./project/view/indice.html`));
    respuesta.end();
});

servidor.get("/usuario",(peticion,respuesta)=>{
    console.log("Alguien ingresó a la pag principal");
    respuesta.write(fs.readFileSync(`./project/view/usuario.html`));
    respuesta.end();
});

servidor.post("/",(peticion,respuesta)=>{
    console.log("Alguien ingresó a la pag principal");
    respuesta.write(fs.readFileSync(`./project/view/indice.html`));
    respuesta.end();
});


/*
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})
 
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})
*/
console.log("Estoy dentro");