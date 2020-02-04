import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { UserAttributes } from 'src/app/shared/constants/user-attributes';
import { SecurityConstants } from 'src/app/shared/constants/security-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem(UserAttributes.USERNAME) && sessionStorage.getItem(SecurityConstants.TOKEN)) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem(SecurityConstants.TOKEN),
        }
      })
    }
    return next.handle(req);
  }
}
