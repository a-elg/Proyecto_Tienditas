require("dotenv").config();
const fs = require("fs");
const express = require("express");
const MySQL=require("./project/controller/db.js");
const app = express();
let connection_ready=false;

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

app.get("/",(request,response)=>{
    response.redirect(`./project/view/index.html`);
    response.end();
});

app.post("/signin",(request,response)=>{
    console.log(request.body);
    response.end();
});

app.post("/ssignin",(request,response)=>{
  console.log(request.body);
  response.end();
});

app.post("/asignin",(request,response)=>{
  console.log(request.body);
  response.end();
});

app.post("/ssignin",(request,response)=>{
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
