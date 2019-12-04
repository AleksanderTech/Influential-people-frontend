import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  private readonly PAGE_SIZE: number = 4;

  private numberOfPages: number;
  private selectedPage: number;
  private heroes: Hero[];  // changes value when click event is emitted

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {

    this.selectedPage = 0;
    this.getHeroes(this.selectedPage, this.PAGE_SIZE);
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getHeroes(this.selectedPage, this.PAGE_SIZE);
  }

  getHeroes(page: number, size: number) {
    this.heroService.getHeroes(page, size).subscribe(data => {
      console.log(data);
      console.log(data['content']);
      this.heroes = data['content'];
      this.numberOfPages = data['totalPages'];
      console.log(this.numberOfPages);
    });
  }
}
