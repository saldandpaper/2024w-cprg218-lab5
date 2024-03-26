document.getElementById('coords-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get latitude and longitude values from the form
    const latitude = document.getElementById('lat').value;
    const longitude = document.getElementById('lon').value;

    const apiKey = 'API_KEY';

    // Construct the API request URL
    const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2024-03-26&api_key=${apiKey}`;

    // Make the GET request to the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the response in the result section
            document.getElementById('result').innerHTML = `<img src="${data.url}" alt="Earth Imagery">`;
        })
        .catch(error => {
            // Log the error
            console.error('Error fetching data:', error);
            // Display error message in result section
            document.getElementById('result').innerText = 'An error occurred while fetching data.';
        });
});