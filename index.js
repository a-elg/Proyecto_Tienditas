const fs=require("fs");
const express=require("express");
const servidor=express();//nuestro servidor funcionará con express
servidor.listen(5000);

servidor.get("/",(peticion,respuesta)=>{
    console.log("Alguien ingresó a la pag principal");
    respuesta.write(fs.readFileSync(`./project/view/indice.html`));
    respuesta.end();
});

console.log("Estoy dentro");