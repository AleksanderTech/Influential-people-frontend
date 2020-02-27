import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { ArticleComment } from '../model/article-comment';
import { Urls } from 'src/app/shared/constants/urls';
import { CurrentUserService } from 'src/app/core/services/current-user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: ArticleComment;
  @Input() articleId: number;
  @Output() commentDeleted: EventEmitter<ArticleComment> = new EventEmitter<ArticleComment>();
  readonly defaultImageUrl:string = Urls.PROFILE_DEFAULT_IMAGE_URL;
  
  constructor(
    private _commentService: CommentService, 
    private _currentUser:CurrentUserService) { }

  ngOnInit() {
  }

  delete() {
    this._commentService.deleteComment(this.comment.id, this.articleId).subscribe(() => { this.commentDeleted.emit(this.comment); });
  }

  isOwner(articleComment: ArticleComment) {
    return articleComment.username === this._currentUser.getCurrentUser().username;
  }
}
