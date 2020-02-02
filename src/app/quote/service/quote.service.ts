import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Quote } from '../model/quote';
import { Urls } from 'src/app/shared/constants/urls';
import { Observable } from 'rxjs';
import { QuoteSearch } from '../model/quote-search';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

   getSpecificQuotes(page: number = 0, size: number = 10, quoteSearch:QuoteSearch): Observable<Quote[]> {
    let url = Urls.ROOT_REST_URL + Urls.QUOTE + Urls.SEARCH_SORT_FILTER;
    url = url + quoteSearch.toQuery();
    url = url + '&page=' + page + '&size=' + size;
    return this.httpClient.get<Quote[]>(url);
  }

  getQuotes(): Observable<Quote[]> {
    return this.httpClient.get<Quote[]>(Urls.ROOT_REST_URL + Urls.QUOTE + Urls.SEARCH_SORT_FILTER + '?paging=false');
  }

  getQuote(name: string): Observable<Quote> {
    return this.httpClient.get<Quote>(Urls.ROOT_REST_URL + Urls.QUOTE + "/" + name);
  }
  
  deleteFavouriteQuote(id: string): Observable<HttpResponse<Config>> {
    return this.httpClient.delete<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.QUOTE + '/' + id + Urls.FAVOURITE);
  }
}
