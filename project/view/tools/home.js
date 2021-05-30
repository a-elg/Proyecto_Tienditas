fetch('http://localhost:5000/catalog', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({user: "Carlos", password: "abcd1234"}),
        cache: 'no-cache'
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        document.getElementById("d").innerHTML = data;
    })
    .catch(function(err) {
        console.error(err);
    });