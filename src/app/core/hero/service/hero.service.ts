import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from '../../../shared/constants/urls';
import { HeroResponse } from '../../hero/model/hero-response'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpClient: HttpClient) { }

  public getHeroes(): Observable<HeroResponse[]> {
    return this.httpClient.get<HeroResponse[]>(Urls.HEROES_ROOT_REST_URL);
  }
}
