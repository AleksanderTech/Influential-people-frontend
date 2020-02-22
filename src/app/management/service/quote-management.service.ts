import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { QuoteSearch } from 'src/app/quote/model/quote-search';
import { Quote } from 'src/app/quote/model/quote';
import { ChangeQuote } from '../quote/model/change-quote';
import { NewQuote } from '../quote/model/new-quote';
import { Hero } from 'src/app/heroes/model/hero';

@Injectable({
  providedIn: 'root'
})
export class QuoteManagementService {

  constructor(private _httpClient:HttpClient) { }

  findQuotes(page: number = 0, size: number = 10, quoteSearch: QuoteSearch): Observable<Quote[]> {
    let url = Urls.ROOT_REST_URL + Urls.QUOTE + Urls.SEARCH_SORT_FILTER;
    if(quoteSearch){
      url = url + quoteSearch.toQuery()+'&page=' + page + '&size=' + size;
    }else{
      url = url + '&page=' + page + '&size=' + size;
    }
    return this._httpClient.get<Quote[]>(url);
  }

  findHeroes(): Observable<Hero[]> {
    return this._httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + Urls.SEARCH_SORT_FILTER+'?paging=false');
  }

  createQuote(quote:NewQuote):Observable<NewQuote>{
    return this._httpClient.post<NewQuote>(Urls.ROOT_REST_URL + Urls.QUOTE,quote);
  }

  changeQuote(id: number,quote: ChangeQuote): Observable<ChangeQuote> {
    return this._httpClient.patch<ChangeQuote>(Urls.ROOT_REST_URL + Urls.QUOTE + "/" + id, quote);
  }

  deleteQuote(id:number):Observable<Quote>{
    return this._httpClient.delete<Quote>(Urls.ROOT_REST_URL + Urls.QUOTE + "/" + id);
  }
}