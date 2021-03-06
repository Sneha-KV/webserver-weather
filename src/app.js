const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000; // if local -> use 3000 port else use port given by heroku

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views' );
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bars engine
app.set('view engine', 'hbs'); // setting up handle bar for Dynamic pages
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDirectoryPath));

//setting up dynamic templates

app.get('', (req, res) => {
    res.render('index', {
        name: 'Sneha',
        title: 'Weather'
    }); // 1. index.hbs file 
});

// about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Sneha'
    });
}); 

// Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sneha',
        question: 'What are the APIs used?',
        answer: 'Weather stack and map box'
    })
});

// weather page
app.get('/weather', (req, res) => {
    console.log(req.query)
    if (!req.query.address) {
        return res.send({ 
            error : 'Please set an address'
        }) 
   }

   // Weather end point
   const address = req.query.address;

   // send address to geocode to get lat and longitude
   geoCode(address, (error, {latitude, longitude, location} = {}) => {
       if (error != undefined) {
            return res.send({ 
                error : 'Please set a valid address'
            }); 
       }
       // sending lat, lon and units parameters
        forecast(latitude, longitude, 'm', (error, {weather, currentTemp, feelsLike, humidity, weatherIcon} = {}) => {
            if(error) {
                return res.send({ 
                    error : 'Please set a valid address'
                }); 
            }

            const weatherObj = {
                address,
                location,
                weather,
                currentTemp,
                feelsLike,
                humidity,
                weatherIcon
            }
            res.send(weatherObj)

       
        });

   })


   
});

app.get('/products', (req, res) => {
   // req.query -> accessing query params
   if (!req.query.search) {
        return res.send({ 
            error : 'Set search'
        }) 
   }
    res.send({ 
        products : []
    })
});

//404 for help articles not found
app.get('/help/*', (req,res) => {
    res.render('oops',{
        title: 'Article not found',
        name: 'Sneha',
        error: 'Help article not found!'
    })
})
// setting up 404 or server error page -> match everything that hasn't been found above
// **** HAS TO BE AT THE END
app.get('*', (req,res) => {
    // res.send('My 404 page!');
    res.render('oops',{
        title: 'Page not found',
        name: 'Sneha',
        error: 'My 404 page!'
    })
})


// app.com/help

app.listen(port, ()=>{
    console.log('Server started at port '+port);
})