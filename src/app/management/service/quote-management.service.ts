import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroSearch } from 'src/app/heroes/model/ hero-search';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/heroes/model/hero';
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class QuoteManagementService {

  constructor(private _httpClient:HttpClient) { }

  getSpecificHeroes(page: number = 0, size: number = 10, heroSearch: HeroSearch): Observable<Hero[]> {
    let url = Urls.ROOT_REST_URL + Urls.HERO + Urls.SEARCH_SORT_FILTER;
    if(heroSearch){
      url = url + heroSearch.toQuery();
    }
    url = url + '&page=' + page + '&size=' + size;
    return this._httpClient.get<Hero[]>(url);
  }

  addHero(hero:Hero):Observable<Hero>{
    return this._httpClient.post<Hero>(Urls.ROOT_REST_URL + Urls.HERO,hero);
  }

  deleteHero(heroName:string):Observable<Hero>{
    return this._httpClient.delete<Hero>(Urls.ROOT_REST_URL + Urls.HERO + "/" + heroName);
  }
}