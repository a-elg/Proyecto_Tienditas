let begins = "<div class='col'><div class='card shadow-sm'><img alt='Product' class='bd-placeholder-img card-img-top' src='";
let continues = "'/><div class='card-body'><p class='card-text text-break fs-5'>";
let continues2 = "</p><p class='card-text'>$";
let continues3 = "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button type='button' class='btn btn-sm btn-outline-primary'>Comprar</button><button type='button' class='btn btn-sm btn-outline-secondary'>Añadir al carrito</button></div></div></div></div></div>";
let scrollcount = 0;
let products = [];

window.addEventListener('load', () => {
    getSession();
    home(0);
    document.getElementById("more").addEventListener("click", () => home(++scrollcount));
});

function home(scrollc) {
    document.getElementById("loadAnim").style.display = "block";
    fetch('http://localhost:5000/catalog', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ c_email: "lobitoveloz777@gmail.com", count: scrollc}),
            cache: 'no-cache'
        })
        .then(response => response.json())
        .then(data => {
            products = products.concat(data);
            let htmlstring = "";
            products.forEach(element => {
                htmlstring += begins;
                htmlstring += element.img_path;
                htmlstring += continues;
                htmlstring += element.name;
                htmlstring += continues2;
                htmlstring += (Number(element.price) * 1.13).toFixed(2);
                htmlstring += continues3;
            });
            document.getElementById("catalog").innerHTML = htmlstring;
            document.getElementById("loadAnim").style.display = "none";
        })
        .catch(function(err) {
            console.error(err);
        });
}

function getSession() {
    let name = sessionStorage.getItem("u_name");
    if(name) {
        document.getElementById("sessionfalse").style.display = "none";
    }
}