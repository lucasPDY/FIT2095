const express = require('express');
const app = express();

// Tells express that there is static resources in views and image
app.use(express.static('views'))
app.use(express.static('image'))
app.get('/', (req, res) => {
    res.sendFile("index.html");
})

app.get('/addTask', (req, res) => {
    res.send("Add Taks");
})

app.get('/listTask', (req, res) => {
    res.send("List Tasks");
})

app.listen(8081);