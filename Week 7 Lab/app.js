//Import packages
const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const Task = require('./models/tasks');
const Developer = require('./models/developers');

//Configure Express
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('image'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);

mongoose.connect('mongodb://localhost:27017/week7lab', function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
});

// let developer1 = new Developer({
//     _id: new mongoose.Types.ObjectId(),
//     name: {
//         firstName: 'Tim',
//         lastName: 'John'
//     },
//     level: "BEGINNER",
//     address: {
//         state: "Selangor",
//         suburb: "Klang",
//         street: "Lan Street",
//         unit: "1"
//     }
// })

// developer1.save(function(err) {
//     if (err) {
//         console.log('Error lmao')
//     }
//     console.log("Developer Added");
// });

// let task1 = new Task({
//     _id: new mongoose.Types.ObjectId(),

//     name: "Clean",
//     assignTo: developer1._id, 
//     dueDate: Date.now(), 
//     status: "InProgress",
//     description: "Clean"
    
    
// })

// task1.save(function(err) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log("Tasks Added");
//     }
// })




//Routes Handlers
//Insert new Task
//GET request: send the page to the client
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/insertTask', function (req, res) {
    res.render("insertTask.html");
})

app.get('/insertDeveloper', function (req, res) {
    res.render("insertDeveloper.html");
})

//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/addnewTask', function (req, res) {
    let TaskDetails = req.body;
    let task1 = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: TaskDetails.taskName,
        assignTo: TaskDetails.taskPerson, 
        dueDate: TaskDetails.taskDate, 
        status: TaskDetails.taskStatus,
        description: TaskDetails.taskDescription
    })
    task1.save(function (err) {
        if (err) {
            console.log(err);
            console.log("CB cannot add");
        }
    })
    res.redirect("/getTasks");
});

app.post("/addnewDev", function (req, res) {
    let devDetails = req.body;
    let newDev = Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: devDetails.devFirstName, 
            lastName: devDetails.devLastName
        },
        level: devDetails.devLevel,
        address: {
            state: devDetails.devState,
            suburb: devDetails.devSuburb,
            street: devDetails.devStreet,
            unit: devDetails.devUnit
        }

    })
    newDev.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect("/listDeveloper");
})
//List all Tasks
// //GET request: send the page to the client. Get the list of documents form the collections and send it to the rendering engine
app.get('/getTasks', function (req, res) {
    Task.find({}, function (err, docs){
        res.render('listTasks', { TasksDb: docs });
    });

});

app.get('/getTasks', function (req, res) {
    console.log("Got this far")
    Task.find({}).sort({name: -1}).limit(5).exec( function(err, docs){
        res.render('listTasks', { TasksDb: docs });
    })
})

app.get('/listDeveloper', function (req, res) {
    Developer.find({}, function(err, docs){
        res.render('listDeveloper', { DeveloperDb: docs });
    })
})
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
    Task.updateOne(filter,theUpdate, function(err, doc) {
        console.log(doc);
    })
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
    let filter = { _id: TaskDetails.taskID};
    Task.deleteOne(filter, function(err, doc) {console.log(doc);});
    res.redirect('/getTasks');// redirect the client to list Tasks page
});

app.get("/deleteAll", function (req, res) {
    Task.deleteMany({status: "Completed"}, function (err, doc) {
        console.log(doc);
      });
    res.redirect('/getTasks');// redirect the client to list Tasks page
})

app.get('/findtasks/:val1/:val2', function (req, res){
    let val1 = parseInt(req.params.val1);
    let val2 = parseInt(req.params.val2);
    let query = { ID : {$gt: val1, $lt: val2}};
    db.collection('Tasks').find(query).toArray(function (err,result){
        res.send(result);
    })
})