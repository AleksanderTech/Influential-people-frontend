import { Component, OnInit } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { HeroResponse } from '../model/hero-response';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  private heroes: HeroResponse[];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(data => {
      console.log(data);

      this.heroes = data['content'];
    });
  }
}
