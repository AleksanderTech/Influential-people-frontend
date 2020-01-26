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

  private readonly searchingAttribute = 'title';
  private searchEntities: Article[];
  private showEntities: boolean;
  private searchValue: string;

  constructor(private articleService: ArticleService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.getArticles(this.selectedPage, this.pageSize);
  }

  onEntitySearching(searchValue: string) {
    this.searchValue = searchValue;
    this.showEntities = true;
  }

  onEntityChoosing(chosenEntity: any) {
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
  }

  getArticles(page: number, size: number) {
    this.articleService.getArticles(page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages']
    });
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getArticles(this.selectedPage, this.pageSize);
  }
}
