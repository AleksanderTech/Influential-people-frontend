import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleSearch } from 'src/app/article/model/article-search';
import { Observable } from 'rxjs';
import { Article } from 'src/app/article/model/article';
import { Urls } from 'src/app/shared/constants/urls';
import { Hero } from 'src/app/heroes/model/hero';
import { ChangeArticle } from '../article/model/change-article';

@Injectable({
  providedIn: 'root'
})
export class ArticleManagementService {

  constructor(private _httpClient: HttpClient) { }

  findArticles(page: number = 0, size: number = 10, articleSearch: ArticleSearch): Observable<Article[]> {
    let url = Urls.ROOT_REST_URL + Urls.ARTICLE + Urls.SEARCH_SORT_FILTER;
    if (articleSearch) {
      url = url + articleSearch.toQuery();
    }
    url = url + '&page=' + page + '&size=' + size;
    return this._httpClient.get<Article[]>(url);
  }

  findHeroes(): Observable<Hero[]> {
    return this._httpClient.get<Hero[]>(Urls.ROOT_REST_URL + Urls.HERO + Urls.SEARCH_SORT_FILTER + '?paging=false');
  }

  createArticle(article: Article): Observable<Article> {
    return this._httpClient.post<Article>(Urls.ROOT_REST_URL + Urls.ARTICLE, article);
  }

  changeArticle(id: number, article: ChangeArticle): Observable<ChangeArticle> {
    return this._httpClient.patch<ChangeArticle>(Urls.ROOT_REST_URL + Urls.ARTICLE + "/" + id, article);
  }

  deleteArticle(ArticleName: string): Observable<Article> {
    return this._httpClient.delete<Article>(Urls.ROOT_REST_URL + Urls.ARTICLE + "/" + ArticleName);
  }
}
