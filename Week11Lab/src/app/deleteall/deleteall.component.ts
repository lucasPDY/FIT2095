import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-deleteall',
  templateUrl: './deleteall.component.html',
  styleUrls: ['./deleteall.component.css']
})
export class DeleteallComponent implements OnInit {

  private actorsDB: any[] = [];
  private moviesDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}
  //Get all Actors
  onGetActors() {
    console.log("From on GetActors");

    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Gets movies
  onGetMovies() {
    console.log("From on GetMovies");
    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    })
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
      this.router.navigate(["/listactors"]);
    });
  }

  //Delete Actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }

  onDeleteMovies(){
    this.moviesDB.forEach((movie) => {
      this.onDeleteMovie(movie);
    })
  }

  onDeleteActors(){
    this.actorsDB.forEach((actor) => {
      this.onDeleteActor(actor);
    })
  }

  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

}
