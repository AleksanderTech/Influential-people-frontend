import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleSearch } from 'src/app/article/model/article-search';
import { Observable } from 'rxjs';
import { Article } from 'src/app/article/model/article';
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ArticleManagementService {

  constructor(private _httpClient:HttpClient) { }

  getSpecificArticles(page: number = 0, size: number = 10, articleSearch: ArticleSearch): Observable<Article[]> {
    let url = Urls.ROOT_REST_URL + Urls.ARTICLE + Urls.SEARCH_SORT_FILTER;
    if(articleSearch){
      url = url + articleSearch.toQuery();
    }
    url = url + '&page=' + page + '&size=' + size;
    return this._httpClient.get<Article[]>(url);
  }

  addArticle(article:Article):Observable<Article>{
    return this._httpClient.post<Article>(Urls.ROOT_REST_URL + Urls.ARTICLE,Article);
  }

  deleteArticle(ArticleName:string):Observable<Article>{
    return this._httpClient.delete<Article>(Urls.ROOT_REST_URL + Urls.ARTICLE + "/" + ArticleName);
  }
}
