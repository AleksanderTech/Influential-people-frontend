import { Component, OnInit } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';
import { HeroSearch } from '../model/ hero-search';
import { CategoryService } from 'src/app/category/service/category.service';
import { Category } from 'src/app/category/model/category';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent extends List<Hero> implements OnInit {

  searchingAttribute = 'name';
  searchEntities: Hero[];
  favouriteHeroes: Hero[];
  showEntities: boolean;
  categories: Category[];
  heroSearch: HeroSearch;
  selectedFilter: string;
  selectedSort: string;
  pathVariableCategory: string;

  constructor(private userService: UserService, private heroService: HeroService, private categoryService: CategoryService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.heroSearch = new HeroSearch();
    this.heroSearch.paging = true;
    this.selectedSort = 'none';
    this.selectedFilter = 'none';
    this.pathVariableCategory = this.route.snapshot.paramMap.get('categoryName');
    if (this.pathVariableCategory) {
      this.heroSearch.categories = [this.pathVariableCategory];
      this.selectedFilter = this.pathVariableCategory;
    }
    this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    this.getCategories();
    this.getFavouritesHeroes();
  }

  sort(sortType: string) {
    this.selectedSort = sortType;
    if (sortType === this.heroSearch.SORT_ASC) {
      this.heroSearch.sort = sortType;
      this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    } else if (sortType === this.heroSearch.SORT_DESC) {
      this.heroSearch.sort = sortType;
      this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    } else {
      this.heroSearch.resetSort();
      this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    }
  }

  filter(categoryName: string) {
    this.selectedFilter = categoryName;
    this.heroSearch.categories = [categoryName];
    this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
  }

  getSpecificHeroes(page: number, size: number, heroSearch: HeroSearch) {
    this.heroService.getSpecificHeroes(page, size, heroSearch).subscribe(data => {
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

  isFavourite(name: string): boolean {
    if (this.favouriteHeroes) {
      return this.favouriteHeroes.find(hero => hero.name === name) != undefined;
    }
  }

  getFavouritesHeroes() {
    this.userService.getFavouritesHeroes().subscribe(entities => {
      this.favouriteHeroes = entities['content'];
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
    });
  }

  onEntitySearching(searchValue: string) {
    this.heroSearch.name = searchValue;
    this.getFavouritesHeroes();
    this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
  }

  onEntityChoosing(chosenEntity: Hero) {
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
  }
}
