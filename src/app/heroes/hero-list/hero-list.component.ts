import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent extends List<Hero> implements OnInit {


  private searchEntities: Hero[];
  private showEntities: boolean;
  private searchValue: string;

  constructor(private heroService: HeroService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.getHeroes(this.selectedPage, this.pageSize);
  }

  onEntitySearching(searchValue: string) {
    this.searchValue = searchValue;
    this.showEntities = true;
    console.log(this.searchValue);

  }
  onEntityChoosing(chosenEntity) {
    console.log(chosenEntity);
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
  }
  updatePage(page: number) {
    this.selectedPage = page;
    this.getHeroes(this.selectedPage, this.pageSize);
  }

  getHeroes(page: number, size: number) {
    this.heroService.getHeroes(page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
    });
  }
}
