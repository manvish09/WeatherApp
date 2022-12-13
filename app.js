const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");
const { response } = require("express");


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");


});

app.post("/", function (req, res) {
    var city = req.body.cityName;
    const cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=43392e7fb34dcbe156f8679c33129354&units=metric";
    https.get(cityUrl, function (response) {
        response.on("data", function (data) {

            
            const weatherData = JSON.parse(data);
            const imageId = weatherData.weather[0].icon;

            const temp = weatherData.main.temp;
            const imageUrl = "http://openweathermap.org/img/wn/" + imageId + "@2x.png";

            res.write("<h1>The current temperature in " + city +" is : " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });

    });
});






app.listen(3000, function () {
    console.log("the server is running at port 3000");
})