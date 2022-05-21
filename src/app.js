const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const weatherForcast = require('./utils/weatherForecast')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars configs
app.set('view engine', 'hbs')
app.set('views',viewsPath )
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title:"Weather App",
        name:'Pete'
    })
})

app.get('/about', (req,res) => {
    res.render('about' , {
        title:"About me",
        name:'Pete'
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        title:"Help me",
        name:'Pete',
        msg:'This msg will rescue your life'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide an address" 
        })
    }
    geoCode(req.query.address, (error, {location, longitude ,latitude} = {} ) => {
        if(error){
            return res.send({ error })
        }
            weatherForcast(latitude, longitude,  (error , forecastData) => {
                if(error){
                    return res.send({ error })
                }
                res.send({
                   forecast: forecastData,
                   location,
                   address: req.query.address
                })
            })
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404', {
        msg:"Help article not found",
        title:'404',
        name:'Pete'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        msg:"Page not found",
        title:'404',
        name:'Pete'
    })
})

app.listen(3000, () => {
    console.log("server up and running on port 3000 ")
})