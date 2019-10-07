import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDB: any[] = [];
  actorsDB: any[] = [];

  section = 1;
  movieName: string = "";
  releaseYear: number = 0;
  aYear: number = 0;
  movieId: string = "";
  actorName: string = "";
  actorId: string = "";

  selectedMovie: string = "";
  selectedId: string = "";

  constructor(private dbService: DatabaseService) {}
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.movieDB = data;
    });
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.movieName, year: this.releaseYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();

    });
  }
  // Update an Movie
  onSelectUpdate(item) {
    this.movieName = item.name;
    this.releaseYear = item.bYear;
    this.movieId = item._id;
  }

  onSelectMovie(movie) {
    this.selectedMovie = movie.title;
    this.selectedId = movie._id;

  }

  onSelectActor(actor) {
    this.actorName = actor.name;
    this.actorId = actor._id;
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();

    });
  }

  onDeleteBeforeYear(){
    // filters the year of each movie and deletes movies that are released after aYear
    let movies = this.movieDB.filter(element => element.year < this.aYear)
    movies.forEach(element => {
      this.onDeleteMovie(element);
    })
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Add Actor to Movie
  onAddMovieActor() {
    let data = { id: this.actorId };
    this.dbService.addMovieActor(this.selectedId, data).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();

    })
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.movieName = "";
    this.releaseYear = 0;
    this.movieId = "";
    this.aYear = 0;
    this.onGetMovies();
    this.onGetActors();
  }

}
