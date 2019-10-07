import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DBServiceService {

  constructor() { }
  getActors() {
    return "Ching Chong"
  }
}
