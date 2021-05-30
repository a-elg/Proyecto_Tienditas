require("dotenv").config();//variables de entorno

const mysql=require("mysql");
const fs = require("fs");
const express = require("express");
const app = express();//nuestro servidor funcionará con express
const bodyparser = require("body-parser");

let con = mysql.createConnection({
    user: "root",
    password:`${process.env.mysql_pw}`,
    database:"aki"
});

con.connect((err)=>{
  if(err) throw err;
  console.log("MySQL server connected");
  let lit_query=`insert into perros values (10,"Salomon")`;

  con.query(lit_query,(err,result)=>{
    if(err)throw err;
    //"INSERT INTO employees (id, name, age, city) VALUES ?";
    //["1","John Cena", "69", "Mexico"]
    //con.query(sql, [values], function (err, result
    console.log(result);
    console.log(`Result of Query: ${result.affectedRows}`);
    console.log("Query realizada");
  });
});

app.use(bodyparser.urlencoded());//Esto es para indicar que usaremos el bodyp.
app.use(express.static("./project/view"));
app.listen(process.env.port);
app.get("/",(request,response)=>{
    console.log("Alguien ingresó a la pag principal");
    response.redirect(`./project/view/index.html`);
    response.end();
});

app.post("/signin",(request,response)=>{
    console.log(request.body);
    response.end();
});

app.post("/catalog",(request,response)=>{
  if(request.headers.referer.includes("http://localhost:5000/home.html")){
    response.contentType(`text/plain`);
    response.send('Catalog');
  }
  response.end();
});

app.post("/signup",(request,response)=>{
  console.log(request.body);
  response.end();
});

app.post("/ssignup",(request,response)=>{
  console.log(request.body);
  response.end();
});

app.post("/dsignup",(request,response)=>{
  console.log(request.body);
  response.end();
});

console.log(`Server up at localhost:${process.env.port}`);
