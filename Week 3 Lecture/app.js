// let express = require('express');
// let app = express();

// app.get('/math/:ops/:op1/:op2', function(req, res){
//     let ops = req.params.ops
    
//     let op1 = parseInt(req.params.op1);
//     let op2 = parseInt(req.params.op2);

//     if (ops=='add'){
//         let result = op1 + op2
//         res.send("Output : " + result)
//     } else if (ops =='sub'){
//         let result = op1 - op2
//         res.send("Output : " + result)
//     } else{
//         res.send("Unknown operator")
//     }

// })
// app.listen(8080);

let express = require('express');
let app = express();

app.get('/math/:operation/:no1/:no2', function(req, res) {
    let operation = req.params.operation;
    let no1 = parseInt(req.params.no1);
    let no2 = parseInt(req.params.no2);
    console.log(operation, no1, no2);
    console.log("add" === operation);
    if (operation == "add") {
        let result = no1 + no2;
        res.send("Output:" + result);
    }
    else if (operation == "sub") {
        let result = no1 - no2;
        res.send("Output:" +  result);
    }
    else{
        res.send("Unknown Operation");
    }
});

app.listen(5050);

// let express = require('express');
// let app = express();
// app.get('/', function (req, res) {
//     console.log('Hello World');
//     res.send('Hello World');
// });
// app.get('/time', function (req, res) {
//     let d = new Date();
//     let msg = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
//     res.send(msg);
// });
// app.get('/date', function (req, res) {
//     let d = new Date();
//     let msg = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
//     res.send(msg);
// });
// app.listen(5050);