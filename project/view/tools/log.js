window.addEventListener("load", load, false);

function load() {
    let form = document.forms[0];
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        event.stopPropagation();
        let req = { email: "", password: "" },
            next = "";
        let entry;
        for (let i = 0; i < form.length; i++) {
            entry = form[i];
            if ((entry.type == "text" || entry.type == "password" || entry.type == "email") && entry.value != "") {
                if (entry.name == "email") req.email = entry.value;
                else if (entry.name == "password") req.password = entry.value;
            } else if (entry.type == "text" || entry.type == "password") {
                alert("Introduce los datos solicitados correctamente");
                return false;
            }
        }
        console.log(form.action);
        if (form.action == "signin") next = "/home.html";
        if (form.action == "dmsignin") next = "/delivery.html";
        if (form.action == "ssignin") next = "/store.html";
        console.log(next);
        fetch(`${form.action}`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": `application/json`,
                }),
                body: JSON.stringify(req)
            })
            .then(response => {
                if (response.status < 400)
                    return response.json();
                else {
                    errora();
                    return null;
                }
            })
            .then(data => {
                if (data)
                    if (data.u_name != "" && (data.case == 1 || data.case == 2)) {
                        sessionStorage.setItem("u_name", data.u_name);
                        let notify;
                        if (data.case == 1) {
                            notify = alertify.alert('Aki', `Bienvenido ${data.u_name}`, function() {
                                alertify.success('Ok');
                            }).set({ onshow: null, onclose: function() { window.location.href = next; } });;
                        } else if (data.case == 2) {
                            notify = alertify.alert('Aki', `Contraseña incorrecta ${data.u_name}`, function() {
                                alertify.success('Recuperar contraseña');
                            }).set({ onshow: null, onclose: function() { window.location.href = "/psswdrcvr.html"; } });;
                        }
                    } else if (data.case == 0)
                    alertify.alert('Aki', 'Correo y contraseña incorrectos, intente de nuevo', function() {
                        alertify.error('Correo y contraseña incorrectos');
                    });
            })
            .catch(function(err) {
                console.error(err);
            });
        return false;
    });
}

function errora() {
    alertify.alert('Aki', 'Ocurrió un error, intente de nuevo más tarde', function() {
        alertify.error('Error');
    });
}