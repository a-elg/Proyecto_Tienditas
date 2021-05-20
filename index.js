require("dotenv").config();
const fs=require("fs");
const express=require("express");
const servidor=express();//nuestro servidor funcionará con express
servidor.listen(process.env.puerto);

servidor.get("/",(peticion,respuesta)=>{
    console.log("Alguien ingresó a la pag principal");
    respuesta.write(fs.readFileSync(`./project/view/indice.html`));
    respuesta.end();
});

console.log("Estoy dentro");