import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Enter Book Title Here';
  db = [];
  hardCover = 0;
  publicationDate = "03/19/1998";
  bookType = "Hard Cover";
  summary = "Placeholder";

  
  saveBook() : void {
    this.db.push({
      title: this.title,
      publicationDate: this.publicationDate,
      bookType: this.bookType,
      summary: this.summary
    });

    this.recalculateBooks();

 }

  deleteBook(index) : void {
    console.log(index);
    this.db.splice(index, 1);
    this.recalculateBooks();

  }

  calculateHardCovers(): void {
    let temp = 0;
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].bookType === "Hard Cover"){
        temp++;
      }
    }
    this.hardCover = temp;
  }

  getTotalBooks(): number {
    return this.db.length;
  }

  deleteHardCovers() : void {
    this.db = this.db.filter((book) => book.bookType != "Hard Cover")
    this.recalculateBooks();
  }

  recalculateBooks(): void {
    this.calculateHardCovers();
    this.getTotalBooks();
  }

  transformBook(index) : void {
    if (this.db[index].bookType === "Hard Cover"){
      this.db[index].bookType = "Paper Back";
    }
    else if (this.db[index].bookType === "Paper Back"){
      this.db[index].bookType = "Hard Cover";
    }
    this.calculateHardCovers();
    this.getTotalBooks();
  }
}
