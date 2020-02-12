import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<any>(Urls.ROOT_REST_URL + Urls.SIGN_UP, JSON.stringify(user), {
      headers: headers,
      observe: "response"
    });
  }
}
