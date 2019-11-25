import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../model/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  constructor(private heroService: HeroService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap);

    this.heroService.getHero(this.route.snapshot.paramMap.get('name')).subscribe(data => {
      console.log(data);
      this.hero = data;
    });
  }
}
