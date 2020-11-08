import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stop-watch';

  public _start :boolean = false;

  constructor(){
  }

  start() {
    this._start=true;
  }
  clear() {
    this._start=false;
  }
}
