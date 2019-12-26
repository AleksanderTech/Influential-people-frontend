import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../model/quote';
import { Urls } from 'src/app/shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

  getQuotes(pageNumber: number = 0, sizeNumber: number = 10): Observable<Quote[]> {
    return this.httpClient.get<Quote[]>(Urls.ROOT_REST_URL + Urls.QUOTE, { params: { page: pageNumber.toString(), size: sizeNumber.toString() } });
  }

  getQuote(name: string): Observable<Quote> {
    return this.httpClient.get<Quote>(Urls.ROOT_REST_URL + Urls.QUOTE + "/" + name);
  }
}
