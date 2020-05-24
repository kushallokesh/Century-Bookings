'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

var app = express();

var fs = require('fs');

app.use(express.static('./'));

app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader("Access-Control-Expose-Headers", "authorization");

    next();
});

async function getdatabase() {
    const database1 = await fs.readFileSync('./Database.json')
    var database = JSON.parse(database1);
    return database
    console.log(database);
}

app.post("/GetSlots", async function (req, res) {

    var data = req.body;
  //  console.log(data)
    var database = await getdatabase();
  //  console.log(database)
    var Slots = database.filter(function (result) {
        console.log(data.Week)
        console.log(result.Week)
        if (result.Week === data.Week && result.Day === data.Day) {
            var object = { "TimeSlot": result.TimeSlot, "Table": result.Table }
            return object
        }
    });

    console.log(Slots)
    res.send (Slots);
});

app.post("/UpdateTable", async function (req, res) {

    var object = req.body;
    console.log(object)
    var database = await getdatabase();

    var Slots = database.filter(function (result) {
   
        if (result.Week === object.Week && result.Day === object.Day && result.TimeSlot === object.TimeSlot && result.Table === object.Table) {
            return object
        }
    });

    if (Slots.length == 0) {

        database.push(object);
        var bookingdatabase = JSON.stringify(database)
        await fs.writeFileSync('./Database.json', bookingdatabase)
        res.send("done")

    }



    res.send("error")

});

app.post("/ViewBookings", async function (req, res) {

    var database = await getdatabase();
   
    res.send(database);
});



http.createServer(app).listen(port, function () {
    console.log('Express server listening on port ' + port);
});


