let todayInit = new Date();
let today = {
    year: todayInit.getFullYear(),
    month: todayInit.getMonth(),
    day: todayInit.getDate()
}

let latitude, longitude, date;
let displayLat = document.getElementById("display-lat");
let displayLon = document.getElementById("display-lon");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoords);
}
else {
    displayLat.innerHTML = "Coordinates not available."
    displayLon.innerHTML = "Coordinates not available."
}

function setCoords(position){
    displayLat.innerHTML = position.coords.latitude;
    displayLon.innerHTML = position.coords.longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    printCoords(); // Call function to print latitude and longitude
} 

if (!today.month[1]){
    today.month = "0" + today.month;
}
if (!today.day[1]){
    today.day = "0" + today.day;
}
date = today.year + "-" + today.month + "-" + today.day;

console.log("date: " + date);

function printCoords() {
    console.log("lat: " + latitude, ", lon: " + longitude);
}

document.getElementById('coords-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get latitude and longitude values from the form
    let inputLatitude = document.getElementById("lat").value;
    let inputLongitude = document.getElementById("lon").value;

    if (!inputLatitude || !inputLongitude) {
        inputLatitude = latitude;
        inputLongitude = longitude;
    }

    let inputDate = document.getElementById("date").value;

    if (inputDate) {
        date = inputDate;
    }

    // stan grad: 51.06460095300076, -114.08923968526184

    const apiKey = '0nsB9sfNIgdaM94keBc6RI1qZdXlg3sQcYpWwBvW';

    const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&dim=1&date=${date}&api_key=${apiKey}`
    
    // const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2014-02-01&dim=0.5&api_key=${apiKey}`
    
    // const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&dim=1&api_key=${apiKey}`
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