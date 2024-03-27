document.getElementById('coords-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get latitude and longitude values from the form
    const latitude = document.getElementById('lat').value;
    const longitude = document.getElementById('lon').value;


    // stan grad: 51.06460095300076, -114.08923968526184


    // Replace 'YOUR_API_KEY' with your actual NASA API key
    const apiKey = '0nsB9sfNIgdaM94keBc6RI1qZdXlg3sQcYpWwBvW';

    // Construct the API request URL
    // const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2024-03-26&api_key=${apiKey}`;
    const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2014-02-01&api_key=${apiKey}`
    console.log(apiUrl);


    // Make the GET request to the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Get image data as blob
        })
        .then(blob => {
            // Create object URL from blob
            const imageUrl = URL.createObjectURL(blob);
            // Set the src attribute of the img element to display the image
            document.getElementById('result-image').src = imageUrl;
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            document.getElementById('result-image').src = ''; // Clear image src
            document.getElementById('result-image').alt = 'An error occurred while fetching data.';
        });
});

let slider = document.getElementById("brightness-slider");
let brightness = document.getElementById("output");

let sliderValue = slider.value;

output.innerHTML = sliderValue/100;

slider.oninput = function () {
    document.getElementById("result-image").style.filter = `brightness(${slider.value})`
    output.innerHTML = this.value;
}