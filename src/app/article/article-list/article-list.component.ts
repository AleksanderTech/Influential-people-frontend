import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { List } from 'src/app/shared/components/list/list';
import { ArticleSearch } from '../model/article-search';
import { Hero } from 'src/app/heroes/model/hero';
import { HeroService } from 'src/app/heroes/service/hero.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent extends List<Article> implements OnInit {

  private searchingAttribute = 'title';
  private searchEntities: Article[];
  private showEntities: boolean;
  private heroes: Hero[];

  private articleSearch: ArticleSearch;
  private selectedFilter: string;
  private selectedSort: string;

  constructor(private articleService: ArticleService, private heroService: HeroService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.articleSearch = new ArticleSearch();
    this.articleSearch.paging = true;
    this.selectedSort = 'none';
    this.selectedFilter = 'none';
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
    this.getHeroes();
  }

  sort(sortType: string) {
    this.selectedSort = sortType;
    if (sortType === this.articleSearch.SORT_NEWEST) {
      this.articleSearch.sort = sortType;
      this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
    } else if (sortType === this.articleSearch.SORT_OLDEST) {
      this.articleSearch.sort = sortType;
      this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
    } else {
      this.articleSearch.resetSort();
      this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
    }
  }

  filter(heroName: string) {
    this.selectedFilter = heroName;
    this.articleSearch.heroes = [heroName];
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
  }

  getSpecificArticles(page: number, size: number, articleSearch: ArticleSearch) {
    this.articleService.getSpecificArticles(page, size, articleSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
      this.showEntities = true;
    });
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(data => {
      this.heroes = data;
    });
  }

  getArticles() {
    this.articleService.getArticles().subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages']
    });
  }

  onEntitySearching(searchValue: string) {
    this.articleSearch.title = searchValue;
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
  }

  onEntityChoosing(chosenEntity: Article) {
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
  }
}
