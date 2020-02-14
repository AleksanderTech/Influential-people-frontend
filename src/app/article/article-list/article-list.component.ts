import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { List } from 'src/app/shared/components/list/list';
import { ArticleSearch } from '../model/article-search';
import { Hero } from 'src/app/heroes/model/hero';
import { HeroService } from 'src/app/heroes/service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent extends List<Article> implements OnInit {

  searchingAttribute = 'title';
  searchEntities: Article[];
  favouriteArticles: Article[];
  showEntities: boolean;
  heroes: Hero[];
  articleSearch: ArticleSearch;
  selectedFilter: string;
  selectedSort: string;
  pathVariableHero: string;

  constructor(private articleService: ArticleService, private userService: UserService, private heroService: HeroService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.articleSearch = new ArticleSearch();
    this.articleSearch.paging = true;
    this.selectedSort = 'none';
    this.selectedFilter = 'none';
    this.pathVariableHero = this.route.snapshot.paramMap.get('heroName');
    if (this.pathVariableHero) {
      this.articleSearch.heroes = [this.pathVariableHero];
      this.selectedFilter = this.pathVariableHero;
    }
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
    this.getHeroes();
    this.getFavouritesArticles();
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

  isFavourite(id: number): boolean {
    if (this.favouriteArticles) {
      return this.favouriteArticles.find(article => article.id === id) != undefined;
    }
  }

  getFavouritesArticles() {
    this.userService.getFavouritesArticles().subscribe(entities => {
      this.favouriteArticles = entities['content'];
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
    this.getFavouritesArticles();
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

  extractDisplayName(value:string,type:string):string{
    if(type === 'sort'){
      if(value === 'none'){
        return type;
      }else{
        if(value === 'asc'){
          return 'oldest';
        }else if(value==='desc'){
          return 'newest';
        }return value;
      }
    }else if(type ==='filter'){
      if(value === 'none'){
        return type;
      }else{
        return value;
      }
    }
  }
}
