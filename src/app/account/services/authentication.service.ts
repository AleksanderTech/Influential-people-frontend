import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/user-login';
import { Urls } from '../../shared/constants/urls';
import { SecurityConstants } from '../../shared/constants/security-constants';
import { UserAttributes } from '../../shared/constants/user-attributes';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(user: UserLogin) {

    return this.httpClient.post<any>(Urls.LOGIN_REST_URL, JSON.stringify(user), { observe: 'response' })
      .pipe(
        map(
          response => {
            sessionStorage.setItem(UserAttributes.USERNAME, user.username);
            let token = (SecurityConstants.TOKEN_PREFIX + response.headers.get(SecurityConstants.AUTHORIZATION))
              .replace(SecurityConstants.TOKEN_PREFIX, '');
            sessionStorage.setItem(SecurityConstants.TOKEN, token);
            return response;
          }
        )
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(UserAttributes.USERNAME);
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem(UserAttributes.USERNAME);
    sessionStorage.removeItem(SecurityConstants.TOKEN);
  }
}
