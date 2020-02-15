import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { QuoteSearch } from 'src/app/quote/model/quote-search';
import { Quote } from 'src/app/quote/model/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteManagementService {

  constructor(private _httpClient:HttpClient) { }

  getSpecificQuotes(page: number = 0, size: number = 10, quoteSearch: QuoteSearch): Observable<Quote[]> {
    let url = Urls.ROOT_REST_URL + Urls.QUOTE + Urls.SEARCH_SORT_FILTER;
    if(quoteSearch){
      url = url + quoteSearch.toQuery()+'&page=' + page + '&size=' + size;
    }else{
      url = url + '&page=' + page + '&size=' + size;
    }
    return this._httpClient.get<Quote[]>(url);
  }

  addQuote(quote:Quote):Observable<Quote>{
    return this._httpClient.post<Quote>(Urls.ROOT_REST_URL + Urls.QUOTE,Quote);
  }

  deleteQuote(QuoteName:string):Observable<Quote>{
    return this._httpClient.delete<Quote>(Urls.ROOT_REST_URL + Urls.QUOTE + "/" + QuoteName);
  }
}