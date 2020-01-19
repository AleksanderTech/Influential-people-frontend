import { Component, OnInit } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';
import { HeroSearch } from '../model/ hero-search';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent extends List<Hero> implements OnInit {

  private searchingAttribute = 'name';
  private searchEntities: Hero[];
  private showEntities: boolean;
  private heroSearch:HeroSearch;
  

  constructor(private heroService: HeroService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.heroSearch = new HeroSearch();
    this.getHeroesInit(this.selectedPage, this.pageSize);
  }

  onEntitySearching(searchValue: string) {
    if(searchValue.length>0){
      this.getSearchingHeroes(this.selectedPage, this.pageSize, this.heroSearch);
      this.heroSearch.name = searchValue;
      this.showEntities = true;
      return;
    }
    this.heroSearch.name = searchValue;
    this.getHeroesInit(this.selectedPage, this.pageSize);
    
  }

  onEntityChoosing(chosenEntity) {
    console.log(chosenEntity);
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
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
        // this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
        console.log(data);
        this.entities = data;
      });
      return;
    }
    this.heroService.getSearchingHeroesList(heroSearch).subscribe(data => {
      // this.entities = data['content'];
     
      console.log(data);
      this.entities = data;
      this.numberOfPages = 1;
    });
  }
}
