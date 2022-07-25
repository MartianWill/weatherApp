const { json } = require("express");
const express = require("express");
const https = require("node:https");
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname +'/index.html');
});

app.post('/', (req,res) => {

     const query = req.body.CityName;
     const apiKey = '';
     const units = req.body.units;
       const url =
       "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=" + units + "&appid=" + apiKey;
     https.get(url, (response) => {
       console.log(response.statusCode);
    
       response.on("data", (data) => {
         console.log(data);
         const weatherData = JSON.parse(data);
         console.log(weatherData);
         const description = weatherData.weather[0].description;
         const temp = weatherData.main.temp;
         const icon = weatherData.weather[0].icon;
         const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
         res.write("<h1>The temperature in " + query +" is " + temp + " C</h1>");
         res.write(
           "<p>the weather description in " + query +" is " + description + "</p>"
         );
         res.write("<img src=" + imgURL + ">");
         res.send();
         // console.log(weatherData);
       });
       // const object = {
       //     name : 'fiwai',
       //     favouriteFood : 'ddf'
       // }
       // var tpe = typeof(JSON.stringify(object));
       // console.log(tpe);
     });
    
     // res.sendFile(__dirname +'/index.html');
    console.log('post request');
})




app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});