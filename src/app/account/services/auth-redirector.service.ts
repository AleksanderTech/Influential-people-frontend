import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectorService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  canActivate() {
    
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
