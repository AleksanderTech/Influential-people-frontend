import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent extends List<Hero> implements OnInit {

  constructor(private heroService: HeroService) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.getHeroes(this.selectedPage, this.pageSize);
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
