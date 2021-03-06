import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { Hero } from '../model/hero';
import { Config } from 'protractor';
import { Rate } from '../model/rate';
import { HeroSearch } from '../model/ hero-search';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpClient: HttpClient) { }

  getTopHeroes(categoryName: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + Urls.SEARCH_SORT_FILTER + `?category=${categoryName}&sort=desc&paging=false`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + Urls.SEARCH_SORT_FILTER + '?paging=false');
  }

  getFavourite(name: string): Observable<Hero> {
    return this.httpClient.get<Hero>(Urls.ROOT_REST_URL + Urls.HERO + '/' + name + Urls.FAVOURITE);
  }

  getFavouritesHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + Urls.FAVOURITE + '?size=200');
  }

  addFavourite(name: string): Observable<HttpResponse<Config>> {
    return this.httpClient.post<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.HERO + '/' + name + Urls.FAVOURITE, '');
  }

  deleteFavourite(name: string): Observable<HttpResponse<Config>> {
    return this.httpClient.delete<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.HERO + '/' + name + Urls.FAVOURITE);
  }

  getSpecificHeroes(page: number = 0, size: number = 10, heroSearch: HeroSearch): Observable<Hero[]> {
    let url = Urls.ROOT_REST_URL + Urls.HERO + Urls.SEARCH_SORT_FILTER;
    url = url + heroSearch.toQuery();
    url = url + '&page=' + page + '&size=' + size;
    return this.httpClient.get<Hero[]>(url);
  }

  getHero(heroName: string): Observable<Hero> {
    return this.httpClient.get<Hero>(Urls.ROOT_REST_URL + Urls.HERO + "/" + heroName);
  }

  rateHero(rate: Rate): Observable<HttpResponse<Config>> {
    return this.httpClient.put<Config>(Urls.ROOT_REST_URL + Urls.HERO + "/" + rate.heroName + Urls.RATE, rate, { observe: 'response' });
  }

  getUserRate(heroName: string): Observable<Rate> {
    return this.httpClient.get<Rate>(Urls.ROOT_REST_URL + Urls.HERO + "/" + heroName + Urls.RATE + Urls.USER);
  }
}
