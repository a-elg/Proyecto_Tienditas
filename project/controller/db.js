require("dotenv").config()

const mysql=require("mysql");

let connection = mysql.createConnection({
    user:`${process.env.mysql_user}`,
    password:`${process.env.mysql_pw}`,
    database:`${process.env.mysql_db}`
});

function query(lit_query){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            console.log("Sucesfully connected to server.");
            connection.query(lit_query,(err,result)=>{
                if(err) throw err;
                //"INSERT INTO employees (id, name, age, city) VALUES ?";
                //["1","John Cena", "69", "Mexico"]
                //con.query(sql, [values], function (err, result
                console.log(`Affected Rows: ${result.affectedRows}`);
                console.log(`Result:`);
                console.log(result);
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
    }   
}module.exports.query=query;

function SaveUser(){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(lit_query,(err,result)=>{
                if(err) throw err;
                console.log(`Affected Rows: ${result.affectedRows}`);
                console.log(`Result:`);
                console.log(result);
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
    }   
}


