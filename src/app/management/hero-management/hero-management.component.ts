import { Component, OnInit } from '@angular/core';
import { HeroManagementService } from '../service/hero-management.service';
import { Hero } from 'src/app/heroes/model/hero';
import { HeroSearch } from 'src/app/heroes/model/ hero-search';
import { List } from 'src/app/shared/other/list';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-hero-management',
  templateUrl: './hero-management.component.html',
  styleUrls: ['./hero-management.component.css']
})
export class HeroManagementComponent extends List<Hero> implements OnInit {

  heroSearch: HeroSearch;
  searchingAttribute: string = 'name';
  modal:Modal;

  constructor(private _heroManage: HeroManagementService) {
    super();
  }

  ngOnInit() {
    this.heroSearch = new HeroSearch();
    this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
  }

  getSpecificHeroes(page: number, size: number, heroSearch: HeroSearch) {
    this._heroManage.getSpecificHeroes(page, size, heroSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
    });
  }

  newHero(){
    this.modal = new Modal(ModalType.INFO,'new hero',true,null);
  }

  deleteHero(hero:Hero){
    this.modal = new Modal(ModalType.WARN,Messages.ARE_YOU_SURE_MESSAGE,true,null);
  }

  editHero(hero:Hero){
    this.modal = new Modal(ModalType.INFO,'edit hero',true,null);
  }

  onModalSubmitting(modal:Modal){
    console.log('Modal submitted');
    this.modal=modal;
  }

  onEntitySearching(searchValue: string) {
    this.heroSearch.name = searchValue;
    this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
  }

  onEntityChoosing(chosenEntity: Hero) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificHeroes(this.selectedPage, this.pageSize, this.heroSearch);
  }
}
