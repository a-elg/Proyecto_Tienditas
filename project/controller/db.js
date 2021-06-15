require("dotenv").config()

const mysql=require("mysql");
const users=require("./../model/User.js");

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
                console.log(`Affected Rows: ${result.affectedRows}`);
                console.log(`Result:`);
                console.log(result);
                console.log(`result[0]:`);
                console.log(result[0]);
                console.log(`result[0][0]:`);
                console.log(result[0][0]);
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
    }   
}module.exports.query=query;


//Customer________________________________________________________________________________________________________________
function saveCustomer(email,name,phone,password){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call createCustomer('${email}','${name}','${phone}','${password}')`,(err,result)=>{
                if(err) throw err;
                return result[0][0].created;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
    }   
}module.exports.saveCustomer=saveCustomer;


function signinCustomer(email,password){
    try {
        connection.connect((err)=>{
            if(err) throw err;
            connection.query(`call signinCustomer('${email}','${password}')`,(err,result)=>{
                if(err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }   
}module.exports.signinCustomer=signinCustomer;








console.log("db.js correctly set");











/*
Queries de modificación:
    [
      [Row{col1:val1,col2:val2,...,col3:val3},Row{col1:val1,col2:val2,...,col3:val3},...,Row{col1:val1,col2:val2,...,col3:val3}], 
      OKpacket{
        affectedRows: n,
        insertId: n,
        serverStatus: n,
        warningCount: n,
        message: '',
        protocol41: bool,
        changedRows: n
      }
    ]

Quieries de consulta:
    [
        Row{col1:val1,col2:val2,...,col3:val3},
        Row{col1:val1,col2:val2,...,col3:val3},
        ...,
        Row{col1:val1,col2:val2,...,col3:val3}
    ]
*/