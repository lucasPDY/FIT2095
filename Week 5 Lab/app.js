let express = require('express');
let app = express();

// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
let parser = require('body-parser');

let db = [];

// render engine configuration
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// tells express to look for static resources under image and views
app.use(express.static("image"))
app.use(express.static("views"))
app.use(express.static("css"))

// Tells express to use the body parser

//  tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) 
//  or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
app.use(parser.urlencoded({
    extended : false
}))

app.use(parser.json())  //basically tells the system that you want json to be used.

// render index.html every time the homepage is requested
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