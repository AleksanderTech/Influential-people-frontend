import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../model/hero';
import { faStar as faSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-hero-tile',
  templateUrl: './hero-tile.component.html',
  styleUrls: ['./hero-tile.component.css']
})
export class HeroTileComponent implements OnInit {

  @Input('hero') hero: Hero;
  @Input('isFavourite') isFavourite: boolean;
  faStar = faStar;
  faSolid = faSolid;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  toogleFavourite(name: string) {
    if (this.isFavourite) {
      this.deleteFavourite(name);
      return;
    }
    this.addFavourite(name);
  }

  deleteFavourite(name: string) {
    this.heroService.deleteFavourite(name).subscribe(response => {
      this.isFavourite = false;
    }, error => {
      alert('Error occured');
    });
  }

  addFavourite(name: string) {
    this.heroService.addFavourite(name).subscribe(response => {
      this.isFavourite = true;
    }, error => {
      alert('Error occured');
    });
  }
}
