import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserLogin } from "../../shared/model/user-login";
import { Observable } from "rxjs";
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(user: UserLogin): Observable<any> {
    return this.httpClient
      .post<any>(Urls.ROOT_REST_URL + Urls.LOGIN,user);
  }
}
