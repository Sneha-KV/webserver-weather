
const weatherForm = document.querySelector('.weatherForm');
const searchField = weatherForm.querySelector('.location');
const errorMsg = document.querySelector('#msg-1');
const foreCastMsg = document.querySelector('#msg-2');
const weatherImg = document.querySelector('.weather-image');

console.log('Client side js loaded');

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const weatherUrl = '/weather?address='+searchField.value;
    foreCastMsg.textContent = 'Loading...';
    errorMsg.textContent = '';
    weatherImg.setAttribute('src', '');
    fetch(weatherUrl).then(weatherSuccess, weatherFailure);
})


const puzzleSuceess = (response) => {
    response.json().then((data)=> {
        console.log(data);
    });
}

const puzzleFailure = (error) => {
    console.log(error);
}

// Puzzle call
// fetch('http://puzzle.mead.io/puzzle').then(puzzleSuceess, puzzleFailure);



const weatherSuccess = (response) => {
   response.json().then((data)=> {
       if(data.error) {
        foreCastMsg.textContent = '';
        errorMsg.textContent = data.error;
        weatherImg.setAttribute('src', '');
       }
        else {
            errorMsg.textContent = '';
            foreCastMsg.textContent = `In ${data.location}, weather description is ${data.weather}, it is currently ${data.currentTemp} degrees celcius but it feels like ${data.feelsLike} celcius. The humidity is ${data.humidity} percent`;
            weatherImg.setAttribute('src', data.weatherIcon);
        }
       
   })
}

const weatherFailure = (error) => {
    foreCastMsg.textContent = '';
    weatherImg.setAttribute('src', '');
    errorMsg.textContent = error;
}



