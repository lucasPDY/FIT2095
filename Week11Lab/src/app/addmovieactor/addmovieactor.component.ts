import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmovieactor',
  templateUrl: './addmovieactor.component.html',
  styleUrls: ['./addmovieactor.component.css']
})
export class AddmovieactorComponent implements OnInit {
  movieDB: any[] = [];
  actorsDB: any[] = [];

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



  onSelectMovie(movie) {
    this.selectedMovie = movie.title;
    this.selectedId = movie._id;
  }

  onSelectActor(actor) {
    this.actorName = actor.name;
    this.actorId = actor._id;
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

  resetValues() {
    this.movieName = "";
    this.releaseYear = 0;
    this.movieId = "";
    this.aYear = 0;
    this.onGetMovies();
    this.onGetActors();
  }

}