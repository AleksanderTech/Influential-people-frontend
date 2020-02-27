import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserLogin } from "../../shared/model/user-login";
import { Observable } from "rxjs";
import { Urls } from 'src/app/shared/constants/urls';
import { UserAttributes } from 'src/app/shared/constants/user-attributes';
import { SecurityConstants } from 'src/app/shared/constants/security-constants';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  // jwtHelper: JwtHelperService = new JwtHelperService();
  // currentUserSubject = new BehaviorSubject<User>(null);
  // currentUser = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  authenticate(user: UserLogin): Observable<any> {
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      // });
    return this.httpClient
      .post<any>(Urls.ROOT_REST_URL + Urls.LOGIN,user
        //  JSON.stringify(user)
      // ,
      //  {
      //   observe: "response", headers
      // }
      );
      // .pipe(
      //   map(response => {
      //     sessionStorage.setItem(UserAttributes.USERNAME, user.username);
      //     sessionStorage.setItem(SecurityConstants.TOKEN, response.body['jwt']);
      //     // this.getUser(user.username).subscribe(user => {
      //     //   sessionStorage.setItem(UserAttributes.USER_AVATAR_URL, user.avatarImageUrl);
      //     // });
      //     return response;
      //   })
      // );
  }

  // getUsername(): string {
  //   return sessionStorage.getItem(UserAttributes.USERNAME);
  // }

  // isUserLoggedIn(): boolean {
  //   // const username = this.getUsername();
  //   const username = sessionStorage.getItem(UserAttributes.USERNAME);
  //   const token = localStorage.getItem(SecurityConstants.TOKEN);
  //   return !(username === null) && !this.jwtHelper.isTokenExpired(token);
  // }

  // isUserAdmin(): boolean {
  //   const token = localStorage.getItem(SecurityConstants.TOKEN);
  //   const decodedToken = atob(token.split('.')[1]);
  //   console.log(decodedToken);

  //   return true;
  // }

  // logOut(): void {
  //   sessionStorage.removeItem(UserAttributes.USERNAME);
  //   sessionStorage.removeItem(SecurityConstants.TOKEN);
  //   // sessionStorage.removeItem(UserAttributes.USER_AVATAR_URL); 
  //   this.router.navigate(['']);
  // }

  // getUser(username: string): Observable<User> {
  //   return this.httpClient.get<User>(Urls.ROOT_REST_URL + Urls.USER + '/' + username);
  // }

  // updateUserImageUrl(url: string) {
  //   sessionStorage.setItem(UserAttributes.USER_AVATAR_URL, url);
  // }

  // getUserImageUrl(): string {
  //   let url = sessionStorage.getItem(UserAttributes.USER_AVATAR_URL);
  //   if (url && url !== 'null') {
  //     return url;
  //   }
  //   return null;
  // }
}
