// Import the libraries needed
const http = require('http');   // http library to create our http server object
const fs = require('fs');   // file system library to handle the files on our system
const urlparse = require('url');    // handles our url parsing
const {parse} = require('querystring'); 


// the parameter is a requestListener/callback function, that fires everytime the server gets a request
http.createServer( (request, response) => {  
    // the initial filename displayed in http://localhost:portNumber/
let filename = "./index.html";
    // parses the url, and gets the pathname 
    let pathName = urlparse.parse(request.url, true).pathname;

    // We need the second one when the home button is pressed
    if (pathName ==='/' || pathName==="/index.html"){
        fs.readFile(filename, function (error, content) { 
            response.writeHead(200, { 
                'Content-Type': 'text/html' 
            });
            response.end(content, 'utf-8');
        });  
    }
    else if (pathName === '/login'){
        // check if the request is a POST request (sending/storing data to the server)
        if(request.method === "POST"){
            let body = '';

            // register a callback everytime data is received
            request.on('data', chunk => {
                console.log(chunk);     // Random chunk of data in a Buffer e.g. <Buffer 75 73 65 72 6e 61 6d 65 3d 61 64 6d 69 6e 26 70 61 73 73 77 6f 72 64 3d 70 61 73 73>
                body += chunk.toString();       // make the chunk a string to get our query out 
                console.log(body);  // e.g. username=admin&password=pass
            });
            console.log(1, body);
            // register another callback that is executed at the end of the data 
            request.on('end', () => {
                // parses the data, into an Object
                let data = parse(body);   
                console.log("data", data);
                // checks if the username and password match the specifications
                if (data.username==="admin" && data.password==="pass"){
                    // updates filename if match
                    filename="./mainpage.html";
                }
                else {
                    // username or password did not match
                    filename="./accessdenied.html";   
                }
                
                // display the corresponding html page according to the data given
                fs.readFile(filename, (error, content) => {
                    response.write(content);
                    response.end() 
                });
            });
        }
    }
    else{
        console.log('We got Error');
        response.writeHead(404);
        response.write('Request not Found');
        response.end();
    }

}).listen(8081);