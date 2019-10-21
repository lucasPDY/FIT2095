import { Component } from "@angular/core";
import * as io from "socket.io-client";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  messageText: string;
  name: string;
  messages: Array<any> = [];
  socket: SocketIOClient.Socket;
  id: string;
  file: string
  flag: boolean = false;

  constructor() {
    this.socket = io.connect();
    // this.file = this.socket.id + ".mp3"
    // console.log(this.socket);
    // console.log(this.socket.id);
    // this.socket.on('connect', function() {
    //   console.log(this.socket.id);
    // });

  }
  ngOnInit() {
    this.messages = new Array();
    this.listen2Events();

  }
  listen2Events() {
    this.socket.on("msg", data => {
      this.messages.push(data);
    });
    this.socket.on('connect', () => {
      console.log(this.socket);
      this.file = this.socket.id + ".mp3";
      console.log(this.file);
    });
    this.socket.on('received', () => {
      this.flag = true;
      this.file = this.socket.id + ".mp3"
      let audio = document.getElementById("player").setAttribute('src', this.file);
      
      // var vid = document.getElementById("player");
      // // vid.src = this.file;
    })

 
  }
  sendMessage() {
    this.flag = false;
    this.file = "";
    this.socket.emit("newMsg",  {
      message: this.messageText,
      name: this.name
    });
    this.messageText = "";
  }
}