import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNavDisplayed: boolean = false;

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {

  }

  showNavbar() {
    this.isNavDisplayed = true;
  }

  closeNavbar() {
    this.isNavDisplayed = false;
  }
}
