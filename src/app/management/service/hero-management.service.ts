import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/heroes/model/hero';
import { Urls } from 'src/app/shared/constants/urls';
import { HeroSearch } from 'src/app/heroes/model/ hero-search';

@Injectable({
  providedIn: 'root'
})
export class HeroManagementService {

  constructor(private _httpClient: HttpClient) { }

  findHeroes(page: number = 0, size: number = 10, heroSearch: HeroSearch): Observable<Hero[]> {
    let url = Urls.ROOT_REST_URL + Urls.HERO + Urls.SEARCH_SORT_FILTER;
    url = url + heroSearch.toQuery();
    url = url + '&page=' + page + '&size=' + size;
    return this._httpClient.get<Hero[]>(url);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this._httpClient.post<Hero>(Urls.ROOT_REST_URL + Urls.HERO, hero);
  }

  changeHero(name: string,hero: Hero): Observable<Hero> {
    return this._httpClient.patch<Hero>(Urls.ROOT_REST_URL + Urls.HERO + "/" + name, hero);
  }

  deleteHero(heroName: string): Observable<Hero> {
    return this._httpClient.delete<Hero>(Urls.ROOT_REST_URL + Urls.HERO + "/" + heroName);
  }

  uploadImage(name: string, formData: FormData): Observable<void> {
    return this._httpClient.put<void>(Urls.ROOT_REST_URL + Urls.HERO + "/" + name + Urls.IMAGE, formData);
  }
}
