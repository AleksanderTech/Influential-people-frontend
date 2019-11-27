import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { UserLogin } from "../../shared/model/user-login";
import { Observable } from "rxjs";
import { Urls } from 'src/app/shared/constants/urls';
import { UserAttributes } from 'src/app/shared/constants/user-attributes';
import { SecurityConstants } from 'src/app/shared/constants/security-constants';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  authenticate(user: UserLogin): Observable<any> {
    return this.httpClient
      .post<any>(Urls.ROOT_REST_URL + Urls.LOGIN, JSON.stringify(user), {
        observe: "response"
      })
      .pipe(
        map(response => {
          sessionStorage.setItem(UserAttributes.USERNAME, user.username);
          let token = (
            SecurityConstants.TOKEN_PREFIX +
            response.headers.get(SecurityConstants.AUTHORIZATION)
          ).replace(SecurityConstants.TOKEN_PREFIX, "");
          sessionStorage.setItem(SecurityConstants.TOKEN, token);
          return response;
        })
      );
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem(UserAttributes.USERNAME);
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem(UserAttributes.USERNAME);
    sessionStorage.removeItem(SecurityConstants.TOKEN);
  }
}
