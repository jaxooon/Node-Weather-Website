const request = require('request')

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=94ec6920ff7ed97d72f75defc1b35c76&query=' + latitude + ',' + longitude

    //console.log(weatherURL)
    request({url, json: true }, (error, { body }) => { 
    // request({url: weatherURL, json: true }, (error, {error, weather_descriptions}) => { 
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees but it feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast