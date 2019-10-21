let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);

const fs = require("fs");
// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

let io = require("socket.io")(server);

let port = 8080;

app.use("/", express.static(path.join(__dirname, "dist/chatApp")));
app.use("/", express.static(path.join(__dirname, "")));

io.on("connection", socket => {
  console.log("new connection made from client with ID="+socket.id);

  socket.emit("id", socket.id);
  socket.on("newMsg", data => {
    const request = {
        input: { text: data.message },
        // Select the language and SSML Voice Gender (optional)
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        // Select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
      }; 

    // Performs the Text-to-Speech request
    client.synthesizeSpeech(request, (err, response) => {
        if (err) {
            console.error("ERROR:", err);
            return;
        }
        mp3Name = socket.id + ".mp3"
        // Write the binary audio content to a local file
        fs.writeFile(mp3Name, response.audioContent, "binary", err => {
        if (err) {
            console.error("ERROR:", err);
            return;
        }
        console.log("Audio content written to file: " + mp3Name);
        socket.emit('received', "");
        });
    });

    io.sockets.emit("msg", { name: data.name, message: data.message, timeStamp: getCurrentDate() });
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

function getCurrentDate() {
  let d = new Date();
  return d.toLocaleString();
}