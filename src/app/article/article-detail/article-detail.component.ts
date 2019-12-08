import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article;
  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleService.getArticle(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      console.log(data);
      this.article = data;
    });
  }
}
