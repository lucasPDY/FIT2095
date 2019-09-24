import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // inserts this component everytime <app-root> is seen in html
  templateUrl: './app.component.html',  // uses this html file as a template
  styleUrls: ['./app.component.css']  // uses this css file to style to template above
})
export class AppComponent {
  title = 'Ola bitches';
  myText: string = "Initial Value";
  clickCount: number = 0;
  data: Array<Object> = [];
  height: number = 0;
  width: number = 0;
  db: Array<string> = [];
  item: string;

  addItem(): void {
    this.db.push(this.item);
  }

  clearItems(): void {
    this.db = [];
  }

  getArea(): number {
    return this.width * this.height;
  }
  getTitle(): string {
    return this.title;
  }

  getSuffix(): void {
    this.myText += "!";
    this.clickCount++;
    let temp:number = Math.random();
    let tempDate:number = Date.now();
    this.data.push({ id: temp,
    date: tempDate})
  }

  getClickCount(): number {
    return this.clickCount
  }

  resetClickCount(): void {
    this.clickCount = 0;
  }

  tooManyClicks(): boolean {
    return this.clickCount > 5;
  }
}
