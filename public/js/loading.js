window.onload = function() {

    var url = '/status/' + document.getElementById('transaction-id').value;

    qwest.get(url)
    .then(function(response) {
        if (response.status == 'success' && response.url) {
            window.location = response.url;
        }
    })
    .catch(function(e,url) {
        // :(
    });

        setInterval(checkStatus, 2000);
    }
    setInterval(checkStatus, 2000);
}
