import { Component, Input} from '@angular/core';
import { Hero } from '../model/hero';
import { faStar as faSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { HeroService } from '../service/hero.service';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';

@Component({
  selector: 'app-hero-tile',
  templateUrl: './hero-tile.component.html',
  styleUrls: ['./hero-tile.component.css']
})
export class HeroTileComponent {

  @Input('hero') hero: Hero;
  @Input('isFavourite') isFavourite: boolean;
  alertMediator:AlertMediator;
  faStar = faStar;
  faSolid = faSolid;

  constructor(private heroService: HeroService) { }

  toogleFavourite(name: string) {
    console.log(this.hero);
    
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
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }

  addFavourite(name: string) {
    this.heroService.addFavourite(name).subscribe(response => {
      this.isFavourite = true;
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }
}
