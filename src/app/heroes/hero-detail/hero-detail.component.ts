import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../model/hero';
import { Rate } from '../model/rate';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  isOpened: boolean;
  constructor(private heroService: HeroService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isOpened = false;
    this.heroService.getHero(this.route.snapshot.paramMap.get('name')).subscribe(data => {
      this.hero = data;
    });
  }

  showRateList(list: HTMLElement) {
    if (this.isOpened) {
      this.closeRateList(list);
      return;
    }
    list.classList.add('show-list');
    this.isOpened = true;
  }

  closeRateList(list: HTMLElement) {
    list.classList.remove('show-list');
    this.isOpened = false;
  }

  rate(listElement: HTMLElement, list: HTMLElement) {
    let rateValue = listElement.innerText;
    this.heroService.rateHero(new Rate(Number(rateValue), this.hero.name))
      .subscribe(data => {
        this.heroService.getHero(this.hero.name).subscribe(hero => {
          this.hero = hero;
        });
      });
    this.closeRateList(list);
  }
}
