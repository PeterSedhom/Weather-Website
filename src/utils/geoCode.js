const request = require('postman-request')

const geoCode = (address, callback ) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGV0ZXJzb2sxIiwiYSI6ImNsMzhoNHoxMDAwanMzam51dzdjZTJram4ifQ.RyZGkyVV9iX3je2d4LKJTw`
    request({ url, json:true}, (err, { body }) => {
        if(err)
            callback("Unable to connect to geo location server!")
        else if(body.features.length === 0)
            callback("Unable to find location!")
        else  
            callback(undefined,{
                location:body.features[0].place_name,
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1]
            })
    }) 
}

module.exports=geoCode