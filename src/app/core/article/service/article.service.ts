import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../article/model/article';
import { Urls } from 'src/app/shared/constants/urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(Urls.ROOT_REST_URL + Urls.ARTICLE);
  }

  getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(Urls.ROOT_REST_URL + Urls.ARTICLE + "/" + id);
  }
}
