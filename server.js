'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var mysql = require('mysql');
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

    next();
});




var connection = mysql.createConnection({
    host: '77.104.168.224',
    user: 'kluarc20_Kushal',
    password: 'kushal777',
    database: 'kluarc20_Century'
});



//var query = "SELECT * FROM TableTennis"

async function getdatabase() {
    const database1 = await fs.readFileSync('./Database.json')
    var database = JSON.parse(database1);
    return database
    console.log(database);
}

async function mysqlkluarc(query,res,status) {

    //connection.connect();

    connection.query(query, function (error, results) {
        if (error) throw error;
        console.log(results);
        res.send(status)
    });
    console.log("resdone")
    //connection.end();

}

function mysqlget(query) {
    return new Promise(function (resolve, reject) {

        //connection.connect();
        
        connection.query(query, function (error, results) {
            if (error) throw error;
            console.log(results);
            
            resolve(results);
           
        });
        
        //connection.end();

    });
}

app.post("/GetSlots", async function (req, res) {

    var object = req.body;
  //  console.log(data)
    var query = "SELECT * FROM TableTennis WHERE Week = '" + object.Week + "' AND Day = '" + object.Day +"'"

    var Slots = await mysqlget(query)

    console.log(Slots)
    res.send (Slots);
});

app.post("/UpdateTable", async function (req, res) {

    var object = req.body;
    console.log(object)

    var query = "SELECT * FROM TableTennis WHERE Week = '" + object.Week + "' AND Day = '" + object.Day + "'AND TimeSlot ='" + object.TimeSlot + "'AND Table7 ='" + object.Table +"'"

    var Slots = await mysqlget(query)
  
    
    if (Slots.length == 0) {

        var status = { "Status": "Booked" };
        var query = "INSERT INTO TableTennis (Week,Day,Mem_No,Name,PartnerName,TimeSlot,Table7) VALUES('" + object.Week + "','" + object.Day + "','" + object.Mem_No + "','" + object.Name + "','" + object.PartnerName + "','" + object.TimeSlot + "','" + object.Table+"')"
        mysqlkluarc(query, res, status)

    }

    else { 

        res.send({ "Status": "Error" })

    }
   
    

});

app.get("/ViewBookings", async function (req, res) {

    var query = "SELECT * FROM TableTennis"
    var database = await mysqlget(query)
   
    res.send(database);
});



http.createServer(app).listen(port, function () {
    console.log('Express server listening on port ' + port);
});


