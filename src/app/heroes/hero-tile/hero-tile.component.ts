import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../model/hero';
import { faStar as faSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { HeroService } from '../service/hero.service';
import { Urls } from 'src/app/shared/constants/urls';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-hero-tile',
  templateUrl: './hero-tile.component.html',
  styleUrls: ['./hero-tile.component.css']
})
export class HeroTileComponent {

  @Input('hero') hero: Hero;
  @Input('isFavourite') isFavourite: boolean;
  modal:Modal;
  faStar = faStar;
  faSolid = faSolid;

  constructor(private heroService: HeroService) { }

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
      this.modal = new Modal(ModalType.INFO, Messages.ERROR_MESSAGE, true, null);
    });
  }

  addFavourite(name: string) {
    this.heroService.addFavourite(name).subscribe(response => {
      this.isFavourite = true;
    }, error => {
      this.modal = new Modal(ModalType.INFO, Messages.ERROR_MESSAGE, true, null);
    });
  }
}
