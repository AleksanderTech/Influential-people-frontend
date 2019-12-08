import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { List } from 'src/app/shared/components/list/list';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent extends List<Article> implements OnInit {


  constructor(private articleService: ArticleService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.getArticles(this.selectedPage, this.pageSize);
  }

  getArticles(page: number, size: number) {
    this.articleService.getArticles(page, size).subscribe(data => {
      console.log(data);
      this.entities = data['content'];
      this.numberOfPages = data['totalPages']
    });
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getArticles(this.selectedPage, this.pageSize);
  }
}
