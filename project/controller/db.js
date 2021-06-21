require("dotenv").config()

const { addressparser } = require("emailjs");
const mysql = require("mysql");
const users = require("./../model/User.js");
const products = require("./../model/Product.js");

const pool = mysql.createPool({
    host: `${process.env.mysql_host}`,
    user: `${process.env.mysql_user}`,
    password: `${process.env.mysql_pw}`,
    database: `${process.env.mysql_db}`
})

function query(sql) {
    return new Promise(
        ( resolve, reject ) => {
            pool.getConnection(
                function(err, connection) {
                    if (err) reject(err)
                    else {
                        connection.query(sql, 
                            ( err, result) => {
                                if ( err ) reject(err);
                                else resolve(result);
                                connection.release();
                            }
                        )
                    }
                }
            )
        }
    )
}module.exports.query= query;

async function getCatalog(scrolling_offset) {
    let inf_boud=scrolling_offset*25;
    let sup_boud=inf_boud+26;
    let result = [];
    const arr = await query(`select * from products where p_id>${inf_boud} AND p_id<${sup_boud}`).catch((err)=>console.log(err));
    arr.forEach(
        (element)=>{
            result.push(new products.Product(element.p_id,element.p_name,element.p_brand,element.p_category,element.p_price, element.p_description,element.p_img_path))
        }
    );
    return result;
}module.exports.getCatalog = getCatalog;

// Signin_____________________________________________
async function signinCustomer(email, password) {
    let a;
    await query(`call signinCustomer('${email}','${password}')`)
    .then(result=>a={name:result[0][0].name_sp,casesignin:result[0][0].casesignin})
    .catch(result=>a=0);
    return a;
}module.exports.signinCustomer = signinCustomer;
  
async function signinStore(email, password) {
    let a;
    await query(`call signinStore('${email}','${password}')`)
    .then(result=>a={name:result[0][0].name_sp,casesignin:result[0][0].casesignin})
    .catch(result=>a=0);
    return a;
}module.exports.signinStore = signinStore;

async function signinDelivery(email, password) {
    let a;
    await query(`call signinDelivery('${email}','${password}')`)
    .then(result=>a={name:result[0][0].name_sp,casesignin:result[0][0].casesignin})
    .catch(result=>a=0);
    return a;
}module.exports.signinDelivery = signinDelivery;

async function signinAdmin(email, password) {
    let a;
    await query(`call signinAdmin('${email}','${password}')`)
    .then(result=>a={name:result[0][0].name_sp,casesignin:result[0][0].casesignin})
    .catch(result=>a=0);
    return a;
}module.exports.signinAdmin = signinAdmin;

// Read______________________________________________
async function readCustomer(email) {
    let a;
    await query(`call readCustomer('${email}')`)
    .then(
        async (result)=>{
            if(result[0][0]==undefined) a=null;
            else{
                result=result[0][0];
                await getShoppingCart(email)
                .then(cart=>{
                    a=new users.Customer(result.c_email,result.c_name,result.c_password,"customer",null,result.c_phone,cart)
                })
                .catch(result=>a=new users.Customer(result.c_email,result.c_name,result.c_password,"customer",null,result.c_phone,null))
            }
        }
    ) 
    .catch(result=>a=null);
    return a;
}module.exports.readCustomer = readCustomer;

    async function getShoppingCart(email) {
        let a=[];
        await query(`
            select
                shopping_carts.p_id as "id",
                products.p_name as "name",
                products.p_price as "price",
                shopping_carts.sc_quantity as "quantity",
                products.p_brand as "brand",
                products.p_category as "category",
                products.p_img_path as "path",
                products.p_description as "desc"
            from shopping_carts 
            left join products on shopping_carts.p_id = products.p_id
            where shopping_carts.c_email="${email}";
        `)
        .then(
            (result)=>{
                result.forEach(
                    (element)=>{
                        a.push(
                            new products.Stock(
                                element.id,
                                element.name,
                                element.brand,
                                element.category,
                                element.price,
                                element.desc,
                                element.path,
                                element.quantity
                            )
                        )
                    }
                );
            }
        )
        .catch(
            (result)=>{
                a=null;
            }
        );
        return a;
    }module.exports.getShoppingCart=getShoppingCart;



///Terminadas ↑↑↑↑↑↑↑↑↑
//Por terminar ↓↓↓↓↓↓↓↓
async function readDeliveryMan(email) {
    let a;
    await query(`call readDeliveryMan('${email}')`)
    .then(
        async (result)=>{
            result=result[0][0];
            let historial;
            let balance;
            a=new users.DeliveryMan(result.dm_email,result.dm_name,result.dm_password,"delivery_man",null,result.dm_phone,historial,balance);
            console.log(result);
        }
    )
    .catch(result=>a=null);
    return a;
}module.exports.readDeliveryMan = readDeliveryMan;

async function getHistorial(email,user){
    let a;
    switch(user.toLowerCase){
        case "c":
        case "customer":
            await query(`
                select
                    orders_histories.c_email as "customer",
                    orders.dm_email as "deliveryman",
                    orders.o_date as "date",
                    orders.o_status as "status",
                    orders.o_cost as "cost",
                orders.o_delivery_address as "address"
                from orders_histories 
                left join orders on orders_histories.o_id = orders.o_id
                where orders_histories.c_email="${email}";
            `)
            .then(
                result=>{
                    a=result;
                }
            )
            .catch(result=>a=null);
            break;
        case "dm":
        case "deliveryman":
        case "deliverymen":
        case "delivery_man":
        case "delivery_men":
            await query(`
                select
                    orders_histories.c_email as "customer",
                    orders.dm_email as "deliveryman",
                    orders.o_date as "date",
                    orders.o_status as "status",
                    orders.o_cost as "cost",
                    orders.o_delivery_address as "address"
            
                from orders_histories 
                left join orders on orders_histories.o_id = orders.o_id
                where orders.dm_email="${email}";`)
            .then(
                result=>{
                    a=result;
                }
            )
            .catch(result=>a=null);
            break;

        case "s":
        case "store":
        case "sa":
        case "store_admin":
        case "storeadmin":
            
            break;
    }
    return a;
}module.exports.getHistorial=getHistorial;
/*
select
    stores.hc_id as "HC_tienda",
    store_admin.sa_rfc as "RFC_admin"
from stores 
left join store_admin<-.ñ
´}+{} on shopping_carts.p_id = products.p_id
where orders.dm_email="${email}";
*/

// Save entities rows________________________________________________________________________________________________________________

async function createCustomer(email, name, phone, password) {
    let a;
    await query(`call createCustomer
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
                a= false;
            }
            a= (result[0][0].created)? true:false;
        }
    )
    .catch(
        (result)=>{
            console.log("Error in query:");
            console.log(result);
            a= false;
        }
    );
    return a;

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

// Read____________________________________________________________________________________________


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
 * 
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

/*

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
async function query(lit_query) {
    return new Promise(
        (resolve,reject)=>{
            connection.query(lit_query, async (err, result) => {
                if (err){
                    reject(err)   
                }
                resolve (result);
            });
        }
    )
}module.exports.query = query;


async function getCatalog(scrolling_offset){
    let a=[]; 
    let inf_boud=scrolling_offset*25;
    let sup_boud=inf_boud+26;
    await query(`select * from products where p_id>${inf_boud} AND p_id<${sup_boud}`)
    .then(
        (result)=>{
            if(!result){
                console.log("false 1");
                return null;
            }
            result.forEach(
                (element)=>{
                        a.push(new products.Product(element.p_id,element.p_name,element.p_brand,element.p_category,element.p_price, element.p_description,element.p_img_path))
                }
            );
            console.log(a);
            return a;
        }
    )
    .catch(
        (result)=>{
            console.log("false 2");
            return null;
        }
    );
}module.exports.getCatalog=getCatalog;
*/
