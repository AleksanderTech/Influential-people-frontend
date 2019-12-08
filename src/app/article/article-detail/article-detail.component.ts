import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { ArticleComment } from '../model/article-comment';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  @ViewChild(CommentListComponent, { static: false }) commentListComponent;
  article: Article;
  constructor(private commentService: CommentService, private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleService.getArticle(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      console.log(data);
      this.article = data;
    });
  }



  addComment(text: string) {
    console.log(text);
    let comment = new ArticleComment();
    comment.content = text;
    comment.username = sessionStorage.username;
    comment.articleId = this.article.id;
    this.commentService.addComment(comment, this.article.id).subscribe(comment => {
      this.commentListComponent.entities.push(comment);
    });


  }
}
