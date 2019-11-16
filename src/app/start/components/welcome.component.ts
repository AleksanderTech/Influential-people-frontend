import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isNavDisplayed: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  clickEvent() {

  }

  showNavbar() {
    this.isNavDisplayed = true;

  }

  closeNavbar() {
    this.isNavDisplayed = false;
  }


}
