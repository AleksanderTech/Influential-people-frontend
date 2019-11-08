import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { HeroDetails } from '../model/hero-details';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: HeroDetails;
  constructor(private heroService: HeroService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.heroService.getHero(this.route.snapshot.paramMap.get('fullName')).subscribe(data => {
      console.log(data);
      this.hero = data;
    });
  }
}
