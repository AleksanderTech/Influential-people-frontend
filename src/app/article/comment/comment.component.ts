import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { ArticleComment } from '../model/article-comment';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: ArticleComment;
  @Input() articleId: number;
  @Output() commentDeleted: EventEmitter<ArticleComment> = new EventEmitter<ArticleComment>();

  constructor(private commentService: CommentService, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  delete() {
    this.commentService.deleteComment(this.comment.id, this.articleId).subscribe(() => { this.commentDeleted.emit(this.comment); });

  }

  isOwner(articleComment: ArticleComment) {
    return articleComment.username === this.authService.getUsername();
  }

}
