var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        // Movie.find(function (err, movies) {
        //     if (err) return res.status(400).json(err);
        //     res.json(movies);
        // });
        Movie.find({}).populate("actors").exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        })
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
            console.log("Movie deleted")
        });
    },
    getMovieRange: function (req, res) {
        // get the year values from req.params
        let year1 = parseInt(req.params.year1);
        let year2 = parseInt(req.params.year2);
        // a chain of where statements where the current year is greater than or equal to year2 and less than or equal to year1
        Movie.where('year').gte(year2).where('year').lte(year1).exec(function (err,data){
            if (err) return res.status(400).json(err);
            res.json(data);

        })
    },
    removeActor: function (req, res) {
        let actorID = req.params.actorID;
        let movieID = req.params.movieID;
        // finds the move in the collection and raises an error if it is not found
        Movie.findOne({_id: movieID }, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            console.log("Found the movie")
            // finds the actor in the collection and raises an error if it is not found
            Actor.findOne({_id: actorID }, function(err, actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                // if it is found remove the actor from the movie
                movie.actors.remove(actor._id);
                console.log("Removed actors")
                movie.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
    addActor: function (req, res) {
        // finds movie
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            // finds actor
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    addSeven: function (req, res) {
        Movie.updateMany({'year':{$gt:1995}},{$inc : {'year' : 7}}).exec(function (err,movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
            })
    }
};