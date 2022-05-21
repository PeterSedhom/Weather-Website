const request = require('postman-request')

const weather = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6b5e179ab6cadaf1fdab567920113290&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`
    request({ url, json:true }, (err, { body }) =>  {
        if(err)
            callback("Unable to connect to weather server!")
        else if(body.error)
            callback("Unable to find location!")
        else 
            callback(undefined, `${body.current.weather_descriptions}. it is currently ${body.current.temperature} degrees out, it feels like ${body.current.feelslike} degrees out.`)
    })    
}

module.exports = weather
