import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Urls } from 'src/app/shared/constants/urls';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isSignedIn()) {
      if (state.url.includes(Urls.MANAGEMENT) && !this._authService.isAdmin()) {
        this._router.navigate(['/home']);
        return false;
      }
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
}
