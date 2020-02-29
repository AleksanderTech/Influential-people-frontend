import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../article/model/article';
import { Urls } from 'src/app/shared/constants/urls';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ArticleSearch } from '../model/article-search';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  getSpecificArticles(page: number = 0, size: number = 10, articleSearch: ArticleSearch): Observable<Article[]> {
    let url = Urls.ROOT_REST_URL + Urls.ARTICLE + Urls.SEARCH_SORT_FILTER;
    url = url + articleSearch.toQuery();
    url = url + '&page=' + page + '&size=' + size;
    return this.httpClient.get<Article[]>(url);
  }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(Urls.ROOT_REST_URL + Urls.ARTICLE + Urls.SEARCH_SORT_FILTER + '?paging=false');
  }

  getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(Urls.ROOT_REST_URL + Urls.ARTICLE + "/" + id);
  }

  getFavourite(id: number): Observable<Article> {
    return this.httpClient.get<Article>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + id + Urls.FAVOURITE);
  }

  getFavouritesArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(Urls.ROOT_REST_URL + Urls.ARTICLE + Urls.FAVOURITE+'?size=200');
  }
  
  addFavourite(id: number): Observable<HttpResponse<Config>> {
    return this.httpClient.post<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + id + Urls.FAVOURITE, '');
  }

  deleteFavourite(id: number): Observable<HttpResponse<Config>> {
    return this.httpClient.delete<HttpResponse<Config>>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + id + Urls.FAVOURITE);
  }
}
