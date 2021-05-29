window.addEventListener("load", load, false);

function load() {
    document.getElementById("home").addEventListener("click", function () { showTabs(0); });
    document.getElementById("stores").addEventListener("click", function () { showTabs(1); });
    document.getElementById("delivery").addEventListener("click", function () { showTabs(2); });
    showTabs(0);
}

function showTabs(i) {
    switch (i) {
        case 1:
            document.getElementById("home").className = "nav-link";
            document.getElementById("stores").className = "nav-link active";
            document.getElementById("delivery").className = "nav-link";
            document.getElementById("homePage").style.display = "none";
            document.getElementById("storesPage").style.display = "block";
            document.getElementById("deliveryPage").style.display = "none";
            break;
        case 2:
            document.getElementById("home").className = "nav-link";
            document.getElementById("stores").className = "nav-link";
            document.getElementById("delivery").className = "nav-link active";
            document.getElementById("homePage").style.display = "none";
            document.getElementById("storesPage").style.display = "none";
            document.getElementById("deliveryPage").style.display = "block"; 
            break;
        default:
            document.getElementById("home").className = "nav-link active";
            document.getElementById("stores").className = "nav-link";
            document.getElementById("delivery").className = "nav-link";
            document.getElementById("homePage").style.display = "block";
            document.getElementById("storesPage").style.display = "none";
            document.getElementById("deliveryPage").style.display = "none"; 
            break;
    }
}