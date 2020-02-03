import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Urls } from 'src/app/shared/constants/urls';
import { UserPassword } from '../model/user-password';
import { Config } from 'protractor';
import { User } from 'src/app/shared/model/user';
import { Hero } from 'src/app/heroes/model/hero';
import { Article } from 'src/app/article/model/article';
import { Quote } from '@angular/compiler';
import { UserEmail } from '../model/user-email';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  changePassword(password: UserPassword): Observable<HttpResponse<Config>> {
    return this.httpClient.put<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.USER + Urls.PASSWORD, password, { observe: 'response' });
  }

  changeEmail(email: UserEmail): Observable<HttpResponse<Config>> {
    return this.httpClient.put<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.USER + Urls.EMAIL, email, { observe: 'response' });
  }

  getUser(username: string): Observable<User> {
    return this.httpClient.get<User>(Urls.ROOT_REST_URL + Urls.USER + '/' + username);
  }

  getFavouritesHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + Urls.FAVOURITE+'?size=200');
  }

  getFavouritesArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(Urls.ROOT_REST_URL + Urls.ARTICLE + Urls.FAVOURITE+'?size=200');
  }

  getFavouritesQuotes(): Observable<Quote[]> {
    return this.httpClient.get<Quote[]>(Urls.ROOT_REST_URL + Urls.QUOTE +  Urls.FAVOURITE+'?size=200');
  }
}
