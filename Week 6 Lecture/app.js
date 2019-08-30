// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const express = require('express');
// const app = express();

// const url = 'mongodb://localhost:27017/';
// let db;
// // first parameter is server url, which is a local server listening at port 27017 (default mongodb port)
// // second parameter is an object that is required for the latest version of MongoDB (default)
// // third parameter is a callback function that will be executed after connecting (err contains the error if it happens, client is used to access the database)
// MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
//     if (err) {
//         console.log('Err  ', err);
//     } else {
//         console.log("Connected successfully to server");
//         db = client.db('flights');   // connects to a db called '
//     }
// });

// app.get('/', function (req, res){
//     flightsData = db.collection('flights');
//     res.send("Initialize")
// });
// // reference the flights collection

// app.get('/check', (req, res) => {
//     db.collection('flights').find({airline: "VA"}).toArray((err, result) => {
//         console.log("flights with VA")

//         console.log(result);
//     })
//     res.send("Inserting Data")
//     db.collection('flights').find({from: "SA", to: "SYD"}).limit(1).toArray((err, result) => {
//         console.log("a flight from SA to SYD")

//         console.log(result);
//     })

//     db.collection('flights').updateMany({from: "SYD", to: "NT"}, { $mul: {cost: 2}}, (err, result) => {
//         console.log("DOUBLE COST FROM SYD NT")

//     });

//     db.collection('flights').deleteMany({cost: { $lt: 300 }}, (err, result) => {
//         console.log("Deleting less than 300")
//         console.log(result)
//     })

// })
// // inserts initial data 

// app.listen(8080);

//Import packages
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');

//Configure Express
const app = express()
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

app.listen(8080);

//Configure MongoDB
const MongoClient = mongodb.MongoClient;
// Connection URL
// const url = 'mongodb://localhost:27017/';
const url = "mongodb://42.128.78.49:55312/";
//reference to the database (i.e. collection)
let db;
//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("travel");
        }
    });


//Routes Handlers
//Insert new User
//GET request: send the page to the client
app.get('/', function (req, res) {
    res.render("index.html");
});

//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/bookingpost', function (req, res) {
    let flightDetails = req.body;
    db.collection('flights').insertOne({ from: flightDetails.from, to: flightDetails.to, airline: flightDetails.airline });
    res.redirect('/'); // redirect the client to list users page
});

// //List all users
// //GET request: send the page to the client. Get the list of documents form the collections and send it to the rendering engine
// app.get('/getusers', function (req, res) {
//     db.collection('users').find({}).toArray(function (err, data) {
//         res.render('listusers', { usersDb: data });
//     });
// });
// //Update user: 
// //GET request: send the page to the client 
// app.get('/updateuser', function (req, res) {
//     res.sendFile(__dirname + '/views/updateuser.html');
// });
// //POST request: receive the details from the client and do the update
// app.post('/updateuserdata', function (req, res) {
//     let userDetails = req.body;
//     let filter = { name: userDetails.unameold };
//     let theUpdate = { $set: { name: userDetails.unamenew, age: userDetails.uagenew, address: userDetails.uaddressnew } };
//     db.collection('users').updateOne(filter, theUpdate);
//     res.redirect('/getusers');// redirect the client to list users page
// })
// //Update User: 
// //GET request: send the page to the client to enter the user's name
// app.get('/deleteuser', function (req, res) {
//     res.sendFile(__dirname + '/views/deleteuser.html');
// });
// //POST request: receive the user's name and do the delete operation 
// app.post('/deleteuserdata', function (req, res) {
//     let userDetails = req.body;
//     let filter = { name: userDetails.uname };
//     db.collection('users').deleteOne(filter);
//     res.redirect('/getusers');// redirect the client to list users page
// });