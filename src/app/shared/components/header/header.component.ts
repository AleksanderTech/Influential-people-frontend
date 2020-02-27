import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from '../../model/user';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isNavDisplayed: boolean = false;

  constructor(
    private _currentUser: CurrentUserService,
    private _authService:AuthService) { }

   isUserSignedIn():boolean{
     return this._authService.isSignedIn();
   }
    
  currentUsername() {
    return this._currentUser.getCurrentUser().username;
  }

  showNavbar() {
    this.isNavDisplayed = true;
  }

  closeNavbar() {
    this.isNavDisplayed = false;
  }
}
