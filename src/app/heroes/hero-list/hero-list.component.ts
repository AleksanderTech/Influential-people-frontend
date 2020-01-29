import { Component, OnInit} from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';
import { HeroSearch } from '../model/ hero-search';
import { CategoryService } from 'src/app/category/service/category.service';
import { Category } from 'src/app/category/model/category';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent extends List<Hero> implements OnInit {

  private searchingAttribute = 'name';
  private searchEntities: Hero[];
  private showEntities: boolean;
  private categories: Category[];

  private heroSearch: HeroSearch;
  private selectedFilter: string;
  private selectedSort: string;

  constructor(private heroService: HeroService, private categoryService: CategoryService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.heroSearch = new HeroSearch();
    this.heroSearch.paging=true;
    this.selectedSort = 'none';
    this.selectedFilter = 'none';
    this.getSpecificHeroes(this.selectedPage, this.pageSize,this.heroSearch);
    this.getCategories();
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
      if(data['pageable']){
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      }else{
        this.entities = data;
        this.numberOfPages = 1;
      }
      this.showEntities = true;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getHeroes(page: number, size: number) {
    this.heroService.getHeroes(page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
    });
  }

  onEntitySearching(searchValue: string) {
      this.heroSearch.name = searchValue;
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
