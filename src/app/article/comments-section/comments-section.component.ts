import { Component, OnInit, Input } from '@angular/core';
import { ArticleComment } from '../model/article-comment';
import { Article } from '../model/article';
import { CommentService } from '../service/comment.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Urls } from 'src/app/shared/constants/urls';
import { List } from 'src/app/shared/other/list';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent extends List<ArticleComment> implements OnInit {

  @Input() article: Article;
  pageSize: number = 10;
  profileImageUrl:string;
  readonly defaultImageUrl:string = Urls.PROFILE_DEFAULT_IMAGE_URL;

  constructor(private commentService: CommentService, private authService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.profileImageUrl=this.authService.getUserImageUrl();
    this.getComments(this.article.id, this.selectedPage, this.pageSize);
  }

  resize(textArea: HTMLBaseElement) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  addComment(text: string) {
    let comment = new ArticleComment();
    comment.content = text;
    comment.articleId = this.article.id;
    comment.username = this.authService.getUsername();
    comment.createdAt = new Date().getTime();
    this.commentService.addComment(comment, this.article.id).subscribe(comment => {
      this.entities.push(comment);
      this.sortCommentsDesc(this.entities);
      this.getComments(this.article.id, this.selectedPage, this.pageSize);
    });
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getComments(this.article.id, this.selectedPage, this.pageSize);
  }

  getComments(articleId: number, page: number, size: number) {
    this.commentService.getComments(articleId, page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
      this.sortCommentsDesc(this.entities);
    });
  }

  sortCommentsDesc(comments: ArticleComment[]) {
    return comments.sort((comment1, comment2) =>
      comment2.createdAt - comment1.createdAt);
  }

  updateComments(comment: ArticleComment) {
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i] === comment) {
        this.entities.splice(i, 1);
      }
    }
    this.getComments(this.article.id, this.selectedPage, this.pageSize);
  }
}
