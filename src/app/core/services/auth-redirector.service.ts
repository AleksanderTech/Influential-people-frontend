import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectorService implements CanActivate, CanLoad {

  canLoad(route: Route): boolean {
    
    return this.canActivate();
  }

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  canActivate() {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
