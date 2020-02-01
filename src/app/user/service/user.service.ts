import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Urls } from 'src/app/shared/constants/urls';
import { UserPassword } from '../model/user-password';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  changePassword(password: UserPassword): Observable<HttpResponse<Config>> {
    return this.httpClient.put<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.USER + Urls.PASSWORD, password, { observe: 'response' });
  }
}
