//Import packages
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;


//Configure Express
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('image'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);

//Configure MongoDB
const MongoClient = mongodb.MongoClient;

// Connection URL
const url = "mongodb://localhost:27017/";

//reference to the database (i.e. collection)
let db;

//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("fit2095db");
        }
    });

//Routes Handlers
//Insert new Task
//GET request: send the page to the client
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/insertTask', function (req, res) {
    res.render("insertTask.html");
})

//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/addnewTask', function (req, res) {
    let TaskDetails = req.body;
    db.collection('Tasks').insertOne({ name: TaskDetails.taskName, person: TaskDetails.taskPerson, date: TaskDetails.taskDate, 
        status: TaskDetails.taskStatus, description: TaskDetails.taskDescription });
        res.redirect("/getTasks");
});
//List all Tasks
//GET request: send the page to the client. Get the list of documents form the collections and send it to the rendering engine
app.get('/getTasks', function (req, res) {
    db.collection('Tasks').find({}).toArray(function (err, data) {
        res.render('listTasks', { TasksDb: data });
    });
});
//Update Task: 
//GET request: send the page to the client 
app.get('/updateTask', function (req, res) {
    res.render('updateTask');
});
//POST request: receive the details from the client and do the update
app.post('/updateTaskdata', function (req, res) {
    let TaskDetails = req.body;
    let filter = { _id: ObjectID(TaskDetails.taskID)};
    let theUpdate = { $set: { status: TaskDetails.taskNewStatus} };
    db.collection('Tasks').updateOne(filter, theUpdate);
    res.redirect('/getTasks');// redirect the client to list Tasks page
})
//Update Task: 
//GET request: send the page to the client to enter the Task's name
app.get('/deleteTask', function (req, res) {
    res.render('deleteTask.html');
});
//POST request: receive the Task's name and do the delete operation 
app.post('/deleteTaskdata', function (req, res) {
    let TaskDetails = req.body;
    let filter = { _id: ObjectID(TaskDetails.taskID)};
    db.collection('Tasks').deleteOne(filter);
    res.redirect('/getTasks');// redirect the client to list Tasks page
});

app.get("/deleteAll", function (req, res) {
    db.collection("Tasks").deleteMany({status: "Completed"}, function (err, obj) {
        console.log(obj.result);
      });
    res.redirect('/getTasks');// redirect the client to list Tasks page
})