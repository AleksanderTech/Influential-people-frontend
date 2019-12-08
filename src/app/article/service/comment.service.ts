import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Urls } from 'src/app/shared/constants/urls';
import { ArticleComment } from '../model/article-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }


  getComments(articleId: number, pageNumber: number = 0, sizeNumber: number = 10): Observable<ArticleComment[]> {
    return this.httpClient.get<ArticleComment[]>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + articleId + Urls.COMMENT, { params: { page: pageNumber.toString(), size: sizeNumber.toString() } });
  }

  addComment(comment: ArticleComment, articleId: number): Observable<ArticleComment> {
    return this.httpClient.post<ArticleComment>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + articleId + Urls.COMMENT, comment);

  }

  deleteComment(commentId: number, articleId: number): Observable<ArticleComment> {
    return this.httpClient.delete<ArticleComment>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + articleId + Urls.COMMENT + '/' + commentId);

  }

}
