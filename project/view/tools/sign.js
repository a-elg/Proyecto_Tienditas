window.addEventListener("load", load, false);
function load() {
    document.getElementById("sign").addEventListener("submit", function verify(e) {
        let psswd = document.getElementById("floatingPassword");
        let rpsswd = document.getElementById("floatingPasswordv");
        if(psswd.value !== rpsswd.value) {
            rpsswd.classList.remove("is-valid");
            rpsswd.classList.add("is-invalid");
            e.preventDefault();
            e.stopPropagation();
        } else {
            rpsswd.classList.remove("is-invalid");
            rpsswd.classList.add("is-valid");
        }
    });
}
