window.addEventListener("load", load, false);

function load() {
    document.getElementById("sign").addEventListener("submit", function verify(e) {
        event.preventDefault();
        event.stopPropagation();
        let psswd = document.getElementById("floatingPassword");
        let rpsswd = document.getElementById("floatingPasswordv");
        if (psswd.value !== rpsswd.value) {
            rpsswd.classList.remove("is-valid");
            rpsswd.classList.add("is-invalid");
            alertify.alert('Aki', 'Las contraseñas no coinciden, intenta de nuevo', function() {
                alertify.error('Las contraseñas no coinciden');
            });
        } else {
            rpsswd.classList.remove("is-invalid");
            rpsswd.classList.add("is-valid");
            let form = document.forms[0];
            let req = {name: "", mail: "", tel: "", password: ""};
            let entry;
            for (let i = 0; i < form.length; i++) {
                entry = form[i];
                if ((entry.type == "text" || entry.type == "password" || entry.type == "email" || entry.type == "tel") && entry.value != "") {
                    if (entry.name == "name") req.name = entry.value;
                    if (entry.name == "email") req.email = entry.value;
                    if (entry.name == "tel") req.tel = entry.value;
                    if (entry.name == "password") req.password = entry.value;
                } else if (entry.type == "text" || entry.type == "password" || entry.type == "email" || entry.type == "tel") {
                    alertify.alert('Aki', 'Introduce correctamente los datos solicitados', function() {
                        alertify.error('Introduce correctamente tus datos');
                    });
                    return false;
                }
            }
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
                    if (data.registred ) {
                        sessionStorage.setItem("u_name", data.u_name);
                        alertify.alert('Aki', `Bienvenido`, function() {
                                alertify.success('Ok');
                            }).set({ onshow: null, onclose: function() { window.location.href = "/home.html"; } });;
                    } else alertify.alert('Aki', 'Correo y contraseña incorrectos, intente de nuevo', function() {
                        alertify.error('Correo y contraseña incorrectos');
                    });
            })
            .catch(function(err) {
                console.error(err);
            });
            return false;
            
        }
    });
}

function errora() {
    alertify.alert('Aki', 'Ocurrió un error, intente de nuevo más tarde', function() {
        alertify.error('Error');
    });
}
