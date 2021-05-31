require("dotenv").config();
const fs = require("fs");
const express = require("express");
const MySQL=require("./project/mysql_db/controller.js");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  console.log(request.body);
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
  let info=request.body;
  console.log(info);
  if(info.password!==info.vpassword)
    response.redirect("./project/view/storesSignup.html");
  response.end();
});

app.post("/dsignup",(request,response)=>{
  let info=request.body;
  console.log(info);
  if(info.password!==info.vpassword)
    response.redirect("./project/view/deliverySignup.html");

  response.end();
});

console.log(`Server up at localhost:${process.env.port}`);
