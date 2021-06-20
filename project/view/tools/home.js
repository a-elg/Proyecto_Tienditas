let begins = "<div class='col'><div class='card shadow-sm'><img alt='Product' class='bd-placeholder-img card-img-top' width='100%' height='225' src='";
let continues = "'/><div class='card-body'><p class='card-text fs-5'>";
let continues2 = "</p><p class='card-text'>";
let continues3 = "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button type='button' class='btn btn-sm btn-outline-primary'>Comprar</button><button type='button' class='btn btn-sm btn-outline-secondary'>Añadir al carrito</button></div></div></div></div></div>";
let scrollcount = 0;

window.addEventListener('load', () => {
    home(0);
    document.getElementById("more").addEventListener("click", () => home(++scrollcount));
});

function home(scrollc) {
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
            let htmlstring = "";
            data.forEach(element => {
                htmlstring += begins;
                htmlstring += element.img_path;
                htmlstring += continues;
                htmlstring += element.name;
                htmlstring += continues2;
                htmlstring += element.price;
                htmlstring += continues3;
            });
            document.getElementById("catalog").innerHTML = htmlstring;
        })
        .catch(function(err) {
            console.error(err);
        });
}
