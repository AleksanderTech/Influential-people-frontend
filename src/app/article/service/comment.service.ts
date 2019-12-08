import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }


  getComments(articleId: number, pageNumber: number = 0, sizeNumber: number = 10): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + articleId + Urls.COMMENT, { params: { page: pageNumber.toString(), size: sizeNumber.toString() } });
  }

  addComment(comment: Comment, articleId: number): Observable<Comment> {
    return this.httpClient.post<Comment>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + articleId + Urls.COMMENT, comment);

  }

  deleteComment(commentId: number, articleId: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(Urls.ROOT_REST_URL + Urls.ARTICLE + '/' + articleId + Urls.COMMENT + '/' + commentId);

  }

}
