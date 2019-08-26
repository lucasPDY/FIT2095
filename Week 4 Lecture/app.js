let express = require('express');

let app = express();

let ejs = require('ejs');

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(express.static("public"));

app.get('/getdate', function(req, res){

    let date = new Date();

    res.send("Current date: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());

});

app.get('/gettime', function(req, res){

    let date = new Date();

    res.send("Current time: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds());

});

app.listen(8080);