import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isNavDisplayed: boolean = false;
  private currentUsername: string;

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {
    this.currentUsername = this.loginService.getUsername();
  }

  showNavbar() {
    this.isNavDisplayed = true;
  }

  closeNavbar() {
    this.isNavDisplayed = false;
  }
}
