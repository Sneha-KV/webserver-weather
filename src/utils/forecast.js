const request = require('request');

//
// Create a reusable function for getting the forecast

// const url = 'http://api.weatherstack.com/current?access_key=806f2b1e855f12d49ab2aef60eaf2a2a&query=&units=f';
const forecast = (latitude, longitude, units,  callback) => {
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=806f2b1e855f12d49ab2aef60eaf2a2a&query='+latitude+','+longitude+'&units='+units;
    request({url: forecastUrl , json: true}, (error, {body}={}) => { // destructuring response to body
        if (error) {
            callback('Unable to connect to Weather Service!');
        } else if(body.error) {
            callback(body.error.code+ ' Unable to find Location.');
        } else {
            const locationObj = body.location;
            const currentObj = body.current;
            var location= locationObj.name,
            weather = currentObj.weather_descriptions[0],
            currentTemp = currentObj.temperature,
            feelsLike = currentObj.feelslike,
            humidity = currentObj.humidity,
            weatherIcon = currentObj.weather_icons[0],
            data = {
                location,
                weather,
                currentTemp,
                feelsLike,
                humidity,
                weatherIcon
            }

            callback(undefined,data);
        }
    })
    

}



module.exports = forecast;