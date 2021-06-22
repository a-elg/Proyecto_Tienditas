window.addEventListener('load', () => {
    getSession();
    initView();
});

function getSession() {
    let name = sessionStorage.getItem("u_name");
    if (name) {
        document.getElementById("displayname").innerHTML = name;
    }
}

function initView() {
    if (sessionStorage.getItem("u_email")) {
        fetch('http://localhost:5000/readDM', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ u_email: sessionStorage.getItem("u_email") }),
                cache: 'no-cache'
            })
            .then(response => response.json())
            .then(data => {
                if (data.id != 0) {
                    document.getElementById("displaybalance").innerHTML = `$${Number(data.balance).toFixed(2)}`;
                }
            })
            .catch(function(err) {
                console.error(err);
            });
        /*fetch('http://localhost:5000/readDMe', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ u_email: sessionStorage.getItem("u_email") }),
            cache: 'no-cache'
        })
        .then(response => response.json())
        .then(data => {
            if (data.id != 0) {
                console.log(data);
                console.log(data.balance);
                document.getElementById("displaybalance").innerHTML = `$${Number(data.balance).toFixed(2)}`;
            }
        })
        .catch(function(err) {
            console.error(err);
        });*/
        fetch('http://localhost:5000/readDMh', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ u_email: sessionStorage.getItem("u_email") }),
                cache: 'no-cache'
            })
            .then(response => response.json())
            .then(data => {
                if (data.id != 0) {
                    for (let i = 0; i < data.history.length; i++) {
                        d
                    }
                    //document.getElementById("displaybalance").innerHTML = `$${Number(data.balance).toFixed(2)}`;
                }
            })
            .catch(function(err) {
                console.error(err);
            });
    }
}