import { Injectable, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserLogin } from "../../shared/model/user-login";
import { Observable, BehaviorSubject } from "rxjs";
import { Urls } from 'src/app/shared/constants/urls';
import { UserAttributes } from 'src/app/shared/constants/user-attributes';
import { SecurityConstants } from 'src/app/shared/constants/security-constants';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  authenticate(user: UserLogin): Observable<any> {
    const headers=new HttpHeaders({
      'Content-Type':  'application/json',});
    return this.httpClient
      .post<any>(Urls.ROOT_REST_URL + Urls.LOGIN, JSON.stringify(user), {
        observe: "response",headers
      })
      .pipe(
        map(response => {
          sessionStorage.setItem(UserAttributes.USERNAME, user.username);
          let token = (
            SecurityConstants.TOKEN_PREFIX +' '+
            response.body['jwt']
          );
          sessionStorage.setItem(SecurityConstants.TOKEN, token);
          sessionStorage.setItem(SecurityConstants.TOKEN, token);
          this.getUser(user.username).subscribe(user => {
            sessionStorage.setItem(UserAttributes.USER_AVATAR_URL, user.avatarImageUrl);
          });
          return response;
        })
      );
  }

  getUsername(): string {
    return sessionStorage.getItem(UserAttributes.USERNAME);
  }

  isUserLoggedIn(): boolean {
    let username = this.getUsername();
    return !(username === null);
  }

  logOut(): void {
    sessionStorage.removeItem(UserAttributes.USERNAME);
    sessionStorage.removeItem(SecurityConstants.TOKEN);
    sessionStorage.removeItem(UserAttributes.USER_AVATAR_URL);
    this.router.navigate(['']);
  }

  getUser(username: string): Observable<User> {
    return this.httpClient.get<User>(Urls.ROOT_REST_URL + Urls.USER + '/' + username);
  }

  updateUserImageUrl(url: string) {
    sessionStorage.setItem(UserAttributes.USER_AVATAR_URL, url);
  }

  getUserImageUrl(): string {
    let url = sessionStorage.getItem(UserAttributes.USER_AVATAR_URL);
    if (url && url !== 'null') {
      return url;
    }
    return null;
  }
}
