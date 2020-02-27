import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SecurityConstants } from 'src/app/shared/constants/security-constants';
import { CurrentUserService } from './current-user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _currentUser:CurrentUserService,
    private _authService:AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    if (this._authService.isSignedIn()) {
      req = req.clone({
        setHeaders: {
          Authorization: SecurityConstants.TOKEN_PREFIX+this._currentUser.getCurrentUser().token,
        }
      })
    }
    return next.handle(req);
  }
}
