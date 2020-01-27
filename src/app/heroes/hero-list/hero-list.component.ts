import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';
import { HeroSearch } from '../model/ hero-search';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

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
  @ViewChild('search', { static: false }) search: SearchComponent;

  constructor(private heroService: HeroService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.heroSearch = new HeroSearch();
    this.getHeroesInit(this.selectedPage, this.pageSize);
  }

  searchSortHeroes(type:string){
    console.log(type);
    
    if(type==='asc'){
      this.heroSearch.sort=type;
      this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    }else if(type==='desc'){
      this.heroSearch.sort=type;
      this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
    }
  }

  onEntitySearching(searchValue: string) {
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
    this.getHeroesInit(this.selectedPage, this.pageSize);
  }

  getHeroesInit(page: number, size: number) {
    this.heroService.getHeroes(page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
    });
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
  }
}
