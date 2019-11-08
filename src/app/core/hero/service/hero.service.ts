import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from '../../../shared/constants/urls';
import { HeroResponse } from '../../hero/model/hero-response';
import { HeroDetails } from '../../hero/model/hero-details';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpClient: HttpClient) { }

  public getHeroes(): Observable<HeroResponse[]> {
    return this.httpClient.get<HeroResponse[]>(Urls.ROOT_REST_URL + Urls.HERO);
  }

  public getHero(fullName: string): Observable<HeroDetails> {
    return this.httpClient.get<HeroDetails>(Urls.ROOT_REST_URL + Urls.HERO + "/" + fullName);
  }
}
