require("dotenv").config()

const { addressparser } = require("emailjs");
const mysql = require("mysql");
const users = require("./../model/User.js");
const products = require("./../model/Product.js");

let connection = mysql.createConnection({
    user: `${process.env.mysql_user}`,
    password: `${process.env.mysql_pw}`,
    database: `${process.env.mysql_db}`
});

try {
    connection.connect((err) => {if(err)throw err});
} catch (error) {
    console.log("Connection failed");
    console.log(error);
}

function query(lit_query) {
    let a;
    try{
        connection.query(lit_query, async (err, result) => {
            if (err) throw err;
            a=result;
        }); 
    }
    catch(error){
        console.log(error);
        a="Error in Query";
    }
    return a;
}module.exports.query = query;

console.log(query("select * from products;"));
// Save entities rows________________________________________________________________________________________________________________

function createCustomer(email, name, phone, password) {
    query(`call createCustomer
        (
            '${email}',
            '${name}',
            '${phone}',
            '${password}'
        )
    `)
    .then(
        (result)=>{
            console.log("Succesfull query\nResult:");
            if(!result){
                return false;
            }
            return true;
        }
    )
    .catch(
        (result)=>{
            console.log("Error in query:");
            console.log(result);
            return false;
        }
    );

}module.exports.createCustomer = createCustomer;


async function saveProduct(name,price,brand,category,img_path,description){
    if (brand===undefined)
        brand=" ";
    await query(`
        insert into products(
            p_name,
            p_price,
            p_brand,
            p_category,
            p_img_path,
            p_description
        ) 
        values(
            '${name}',
            ${price},
            '${brand}',
            '${category}',
            '${img_path}',
            '${description}'
        );
    `)
    .then(
        (result)=>{
            console.log("Succesfull query\nResult:");
            if(!result){
                return false;
            }
            return true;
        }
    )
    .catch(
        (result)=>{
            console.log("Error in query:");
            console.log(result);
            return false;
        }
    );

}module.exports.saveProduct = saveProduct;

async function signinCustomer(email, password) {
    let a;
    await query(`call signinCustomer('${email}','${password}')`)
    .then(
        (result)=>{
            console.log("Succesfull query");
            if(!result){
                a= false;
            }
            a= true;
        }
    )
    .catch(
        (result)=>{
            a= false;
        }
    );

    return a;
}module.exports.signinCustomer = signinCustomer;


async function getCatalog(scrolling_offset){
    let a=[]; 
    let inf_boud=scrolling_offset*25;
    let sup_boud=inf_boud+26;
    await query(`select * from products where p_id>${inf_boud} AND p_id<${sup_boud}`)
    .then(
        (result)=>{
            console.log("Succesfull query");
            if(!result){
                console.log("false 1");
                return Promise.resolve(null);
            }
            result.forEach(
                (elemento)=>{
                        a.push(new products.Product(elemento.p_id,elemento.p_name,elemento.p_brand,elemento.p_category,elemento.p_price, elemento.p_description,elemento.p_img_path))
                }
            );
            console.log(a);
            return Promise.resolve(a);
        }
    )
    .catch(
        (result)=>{
            console.log("false 2");
            return Promise.resolve(null);
        }
    );
}module.exports.getCatalog=getCatalog;

async function readCustomer(email) {
    await query(`call readCustomer('${email}');`)
    .then(
        (result)=>{
            console.log("Succesfull query");
            if(!result){
                return false;
            }
            console.log(result);
            result=result[0][0];
            return new users.Customer(result.c_email,result.c_name,result.c_password,"Customer",null,);
        }
    )
    .catch(
        (result)=>{
            return false;
        }
    );
}module.exports.readCustomer = readCustomer;

async function getShoppingCart(email) {
    await query(`select * from shopping_carts where c_email='${email}';`)
    .then(
        (result)=>{
            console.log("Succesfull query");
            if(!result){
                return false;
            }
            console.log(result);
            result=result[0][0];
            return true;
        }
    )
    .catch(
        (result)=>{
            return false;
        }
    );
}

//saveProduct("Gomitas",12,"Ricolino","Dulces","https://www.superama.com.mx/Content/images/products/img_large/0750303037408L.jpg","Gomitas bañadas en azucar 63gr");

//getShoppingCart("emmanuel@outlook.com");







// Signin_____________________________________________________________________________________________


//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------


async function signinStore(email, password) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call signinStore('${email}','${password}')`, (err, result) => {
                if (err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.signinStore = signinStore;

async function signinDelivery(email, password) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call signinDelivery('${email}','${password}')`, (err, result) => {
                if (err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.signinDelivery = signinDelivery;

async function signinAdmin(email, password) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call signinAdmin('${email}','${password}')`, (err, result) => {
                if (err) throw err;
                return result[0][0].casesignin;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.signinAdmin = signinAdmin;

// Read____________________________________________________________________________________________


async function readDeliveryMan(email) {
    try {
        connection.connect((err) => {
            if (err) throw err;
            connection.query(`call readDeliveryMan('${email}')`, (err, result) => {
                if (err) throw err;
                let query_result = result[0][0];
                let user = new users.Customer(
                    query_result.dm_email,
                    query_result.dm_name,
                    query_result.dm_phone,
                    query_result.dm_rfc,
                    query_result.dm_password,
                    "delivery_men",
                    null,
                    null
                );
                return user;
            });
        });
    } catch (error) {
        console.log("Error:");
        console.log(error);
        return 0;
    }
}module.exports.readDeliveryMan = readDeliveryMan;
// User operations_________________________________________________________________________________________________




console.log("db.js correctly set");

//insert into products (p_name,p_price,p_brand,p_category,p_img_path,p_description) values ('Paracetamol',40,'Similares','Salud','https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/4-Nitrophenol_acsv.svg/1920px-4-Nitrophenol_acsv.svg.png','Caja de paracetamol de 10 tabletas de 20gr cada una.');
//https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/4-Nitrophenol_acsv.svg/1920px-4-Nitrophenol_acsv.svg.png






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

/**
 * Catálodo
 * Arreglo de productos
 * 
 * Para cada signin
 * nombre 
 * 
 * Consultar carrito
 * arreglo obj_prod-candidad
 * 
 * Añadir product a carrito
 * sobreescribit
 * 
 * ordenes de un repartidor
 * devoler las últimas 3
 *  id_orden
 *  delivery address
 *  descripción del prod
 *  cantidadad
 * 
 * Historial lo mismo ↑
 * 
 * Añadir producto de tienda cuando añadimos prod   
 * 
 * Buscar producto similar
 *  5 prod max
 * mandan cadena, regresar prod
 * 
 * getstoresfromadmin admin store
 *  correo del admin
 *  la tienda
 * 
 * Actualizar existencias
 *  Manda id de tienda
 *  mandar id prod
 *  candidad a remplazar
 *  
 * retirar prod de tu tienda
 *  retirar de tabla prod
 * 
 * cada que se consulte por un producto, si su existencia es 0, no mostrar
 * 
 */