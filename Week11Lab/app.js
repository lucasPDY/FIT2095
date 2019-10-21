const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
const path = require('path');


app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/Week11Lab")));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
// put is to update data or create it if it doesn't exist
app.put('/movies/:id', movies.updateOne);
// delete a movie by ID
app.delete('/movies/:id', movies.deleteOne);
// get all movies produced between two years
app.get('/movies/:year2/:year1', movies.getMovieRange);
// remove a movie for the list of movies of an actors
app.delete('/actors/:actorID/:movieID', actors.removeMovie);
// remove a actor for the list of actors in a movie
app.delete('/movies/:movieID/:actorID', movies.removeActor);
// add an actor to a movie
app.post('/movies/:id/actors', movies.addActor);
// delete an actor and all movies
app.delete('/actors/:id/deleteMovies', actors.deleteWithMovie)
app.put('/movies', movies.addSeven)

app.use("*", express.static(path.join(__dirname, "dist/Week11Lab")));
