import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAttributes } from 'src/app/shared/constants/user-attributes';
import { Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';
import { CurrentUser } from 'src/app/shared/model/current-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private router: Router,
    private currentUser: CurrentUserService) { }

  isSignedIn(): boolean {
    const currentUser = this.currentUser.getCurrentUser();
    return !(currentUser.username === null) && !(this._jwtHelper.isTokenExpired(currentUser.token));
  }

  isAdmin(): boolean {
    return this.currentUser.getCurrentUser().roles.includes(UserAttributes.ROLE_ADMIN);
  }

  logout() {
    this.currentUser.saveCurrentUser(new CurrentUser());
    this.currentUser.saveToken('');
    this.router.navigate(['/']);
  }
}
