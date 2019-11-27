import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = sessionStorage.username;
  isNavDisplayed: boolean = false;
  currentUser: User;

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
