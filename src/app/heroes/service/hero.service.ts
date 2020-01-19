import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { Hero } from '../model/hero';
import { Config } from 'protractor';
import { Rate } from '../model/rate';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpClient: HttpClient) { }

  public getHeroes(pageNumber: number = 0, sizeNumber: number = 10): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO, { params: { page: pageNumber.toString(), size: sizeNumber.toString() } });
  }

  public getSortedHeroes(pageNumber: number = 0, sizeNumber: number = 10): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + '/search-filter?sort=desc', { params: { page: pageNumber.toString(), size: sizeNumber.toString() } });
  }

  public getHero(heroName: string): Observable<Hero> {
    return this.httpClient.get<Hero>(Urls.ROOT_REST_URL + Urls.HERO + "/" + heroName);
  }

  public rateHero(rate: Rate): Observable<HttpResponse<Config>> {
    return this.httpClient.put<Config>(Urls.ROOT_REST_URL + Urls.HERO + "/" + rate.heroName + Urls.RATE, rate, { observe: 'response' });
  }

  public getUserRate(heroName: string): Observable<Rate> {
    return this.httpClient.get<Rate>(Urls.ROOT_REST_URL + Urls.HERO + "/" + heroName+Urls.RATE+Urls.USER);
  }
}
