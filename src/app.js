const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs' )
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//express static takes the path to the folder we want to serve up
//Main page is served up from static directory
app.use(express.static(pubDirPath))

//serve up webpages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jackson Barr'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jackson Barr'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Get help!',
        title: 'Help',
        name: 'Jackson Barr'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => { 
        if (error){
           return res.send({error})
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
             } 

             res.send({
                forecast: forecastData,
                location: location,
                address: address
            })  
        })
    })
})
 
app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title:'404',
        name: 'Jackson Barr',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Jackson Barr',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

