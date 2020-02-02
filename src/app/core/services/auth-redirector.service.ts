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
    console.log(this.router);
    
    if (this.authService.isUserLoggedIn()) {
      console.log('true');
      
      return true;
    }
    console.log('false');
    this.router.navigate(['']);
    return false;
  }
}
