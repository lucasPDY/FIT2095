// const express = require('express');
// const app = express();

// // Tells express that there is static resources in views and image
// app.use(express.static('views'))
// app.use(express.static('image'))
// app.get('/', (req, res) => {
//     res.sendFile("index.html");
// })

// app.get('/addTask', (req, res) => {
//     res.send("Add Taks");
// })

// app.get('/listTask', (req, res) => {
//     res.send("List Tasks");
// })

// app.listen(8081);

let express = require('express');
let app = express();
let parser = require('body-parser');

let db = [];

// render engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("image"))
app.use(express.static("views"))


app.use(parser.urlencoded({
    extended : false
}))

app.get("/", function (req, res) {
    res.render("index.html")
});


app.get("/addTask", function (req, res) {
    res.render("addTask.html")
})

app.get("/listTask", function (req, res) {
    console.log(db)
    res.render( "listTask.html", {tasks : db})
})


// when the user clicks on the submit button
app.post("/data", function (req, res) {
    console.log(req.body);
    //bodyParser is responsible for generating the body object 
    db.push(req.body);
    // after pushing the new customer to the database, redirect the client to allcustomer.html 
    res.render("listTask.html", {
      tasks: db
    });
  });

app.listen(8080)