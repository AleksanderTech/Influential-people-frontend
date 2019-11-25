import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { Hero } from '../model/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpClient: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO);
  }

  public getHero(heroName: string): Observable<Hero> {
    return this.httpClient.get<Hero>(Urls.ROOT_REST_URL + Urls.HERO + "/" + heroName);
  }
}
