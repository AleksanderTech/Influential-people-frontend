import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/account/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNavDisplayed: boolean = false;
  // navbarHeight: number;

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {
    // this.navbarHeight = document.querySelector('.navbar-center').offsetHeight;
    // console.log(this.navbarHeight);
    // this.setUpCenterNavbar();
  }

  showNavbar() {
    this.isNavDisplayed = true;
  }

  // setUpCenterNavbar() {
  //   document.querySelector('.clean-fixed-position').style.height = this.navbarHeight + 'px';

  // }

  closeNavbar() {
    this.isNavDisplayed = false;
  }
}
