import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { Urls } from 'src/app/shared/constants/urls';
import { UserPassword } from '../model/user-password';
import { Config } from 'protractor';
import { UserEmail } from '../model/user-email';
import { Hero } from 'src/app/heroes/model/hero';
import { Article } from 'src/app/article/model/article';
import { Quote } from 'src/app/quote/model/quote';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(username: string, headers?: HttpHeaders): Observable<User> {
    return this.httpClient.get<User>(Urls.ROOT_REST_URL + Urls.USER + '/' + username, { headers });
  }
  
  changePassword(password: UserPassword): Observable<HttpResponse<Config>> {
    return this.httpClient.put<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.USER + Urls.PASSWORD, password, { observe: 'response' });
  }

  changeEmail(email: UserEmail): Observable<HttpResponse<Config>> {
    return this.httpClient.put<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.USER + Urls.EMAIL, email, { observe: 'response' });
  }

  getFavouritesHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + Urls.FAVOURITE + '?size=200');
  }

  getFavouritesArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(Urls.ROOT_REST_URL + Urls.ARTICLE + Urls.FAVOURITE + '?size=200');
  }

  getFavouritesQuotes(): Observable<Quote[]> {
    return this.httpClient.get<Quote[]>(Urls.ROOT_REST_URL + Urls.QUOTE + Urls.FAVOURITE + '?size=200');
  }

  deleteFavouriteArticle(id: number): Observable<HttpResponse<Config>> {
    return this.httpClient.delete<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + id + Urls.FAVOURITE);
  }

  deleteFavouriteHero(name: string): Observable<HttpResponse<Config>> {
    return this.httpClient.delete<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.HERO + '/' + name + Urls.FAVOURITE);
  }

  deleteFavouriteQuote(name: number): Observable<HttpResponse<Config>> {
    return this.httpClient.delete<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.QUOTE + '/' + name + Urls.FAVOURITE);
  }
}
