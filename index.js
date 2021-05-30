require("dotenv").config();//variables de entorno

//const mysql=require("mysql");
const fs=require("fs");
const express=require("express");
const servidor=express();//nuestro servidor funcionará con express
const bodyparser=require("body-parser");

servidor.use(bodyparser.urlencoded());//Esto es para indicar que usaremos el bodyp.

servidor.listen(process.env.puerto);

servidor.use(express.static("./project/view"));

servidor.get("/",(peticion,respuesta)=>{
    console.log("Alguien ingresó a la pag principal");
    respuesta.write(fs.readFileSync(`./project/view/index.html`));
    respuesta.end();
});

/*
servidor.post("/usuario",(peticion,respuesta)=>{
    console.log("Alguien ingresó a la pag principal");
    respuesta.write(fs.readFileSync(`./project/view/indice.html`));
    respuesta.end();
});*/

servidor.post("/signin",(peticion,respuesta)=>{
    console.log(peticion.body);
    respuesta.end();
});

servidor.post("/signup",(peticion,respuesta)=>{
  console.log(peticion.body);
  respuesta.end();
});

servidor.post("/ssignup",(peticion,respuesta)=>{
  console.log(peticion.body);
  respuesta.end();
});

servidor.post("/dsigninup",(peticion,respuesta)=>{
  console.log(peticion.body);
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