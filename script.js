document.getElementById("apiCallButton").addEventListener("click", function() {
    const baseUrl = 'https://cyberarkservices:23456/api/Accounts?AppID=myapp&Safe=Test&Object=testobject';

    fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',  // Replace with your actual token
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return response.json(); // Assuming the response is JSON
    })
    .then(data => {
        document.getElementById('output').innerHTML = `
            <h2>API Response:</h2>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    })
    .catch(error => {
        document.getElementById('output').innerHTML = `
            <h2>Error:</h2>
            <p>${error.message}</p>
        `;
    });
});
