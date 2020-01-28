import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';
import { HeroSearch } from '../model/ hero-search';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
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
  private heroSearch: HeroSearch;
  private categories: Category[];

  private selectedFilter:string;
  private selectedSort:string;

  private readonly SORT_ASC: string = 'asc';
  private readonly SORT_DESC: string = 'desc';
  private readonly SORT_NONE: string = 'none';

  @ViewChild('search', { static: false }) search: SearchComponent;

  constructor(private heroService: HeroService, private categoryService: CategoryService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.heroSearch = new HeroSearch();
    this.getHeroesInit(this.selectedPage, this.pageSize);
    this.getCategoriesInit();
  }

  searchSortHeroes(sortType: string) {
    this.selectedSort=sortType;
    this.heroSearch.paging = true;
    if (sortType === this.SORT_ASC) {
      this.heroSearch.sort = sortType;
      this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    } else if (sortType === this.SORT_DESC) {
      this.heroSearch.sort = sortType;
      this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    } else if (sortType === this.SORT_NONE) {
      this.heroSearch.reset();
      this.getHeroesInit(this.selectedPage, this.pageSize);
    }
  }

  onEntitySearching(searchValue: string) {
    this.heroSearch.reset();
    if (searchValue.length >= 1) {
      this.heroSearch.name = searchValue;
      this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
      return;
    }
    this.heroSearch.name = searchValue;
    this.getHeroesInit(this.selectedPage, this.pageSize);

  }

  onEntityChoosing(chosenEntity) {
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    if (this.heroSearch.sort) {
      this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    } else {
      this.getHeroesInit(this.selectedPage, this.pageSize);
    }
  }

  getCategoriesInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getHeroesInit(page: number, size: number) {
    this.heroService.getHeroes(page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
    });
  }

  filter(categoryName: string) {
    this.selectedFilter=categoryName;
    this.heroSearch.categories=[categoryName];
    this.heroSearch.paging=true;
    this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
  }

  getSearchingHeroes(page: number, size: number, heroSearch: HeroSearch) {
   
    if (heroSearch.paging === true) {
      this.heroService.getSearchingHeroesPage(page, size, heroSearch).subscribe(data => {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
        this.showEntities = true;
      });
      return;
    } else
      this.heroService.getSearchingHeroesList(heroSearch).subscribe(data => {
        if (data.length > 0) {
          this.entities = data;
          this.numberOfPages = 1;
          this.showEntities = true;
        } else {
          this.search.closeDropdown();
          this.showEntities = false;
        }
      });
      this.selectedFilter=null;
      this.selectedSort=null;
  }
}
