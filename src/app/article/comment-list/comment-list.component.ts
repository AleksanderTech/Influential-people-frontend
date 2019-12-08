import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { List } from 'src/app/shared/components/list/list';
import { CommentService } from '../service/comment.service';
import { Article } from '../model/article';
import { ArticleComment } from '../model/article-comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent extends List<ArticleComment> implements OnInit, OnChanges {


  @Input() article: Article;
  constructor(private commentService: CommentService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.getComments(this.article.id, this.selectedPage, this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.entities);


  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getComments(this.article.id, this.selectedPage, this.pageSize);
  }

  addComment(comment: ArticleComment, articleId: number) {
    this.commentService.addComment(comment, articleId).subscribe(comment => {
      this.entities.push(comment);
    })
  }

  getComments(articleId: number, page: number, size: number) {
    this.commentService.getComments(articleId, page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
      console.log(this.entities);
    });
  }

  updateComments(comment: ArticleComment) {
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i] === comment) {
        this.entities.splice(i, 1);
      }
    }
  }

}
