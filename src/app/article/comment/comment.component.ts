import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { ArticleComment } from '../model/article-comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: ArticleComment;
  @Output() commentDeleted: EventEmitter<ArticleComment> = new EventEmitter<ArticleComment>();

  constructor(private commentService: CommentService) { }

  ngOnInit() {

  }

  delete() {
    this.commentDeleted.emit(this.comment);
    this.commentService.deleteComment(this.comment.id, 1).subscribe();
  }

}
