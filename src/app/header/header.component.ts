import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private LOGO = require("./icon.png");
  @Output() start: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  run(){
    this.start.emit(1);
  }

}
