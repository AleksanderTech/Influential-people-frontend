import { Component, OnInit } from '@angular/core';
import { HeroManagementService } from '../../service/hero-management.service';
import { Hero } from 'src/app/heroes/model/hero';
import { HeroSearch } from 'src/app/heroes/model/ hero-search';
import { List } from 'src/app/shared/other/list';
import { Messages } from 'src/app/shared/constants/messages';
import { Searchable } from 'src/app/shared/other/searchable';
import { Manageable } from 'src/app/shared/other/manageable';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { DeleteMediator } from 'src/app/shared/model/delete-mediator';
import { CategoryService } from 'src/app/category/service/category.service';
import { Category } from 'src/app/category/model/category';

@Component({
  selector: 'app-hero-management',
  templateUrl: './hero-management.component.html',
  styleUrls: ['./hero-management.component.css']
})
export class HeroManagementComponent extends List<Hero> implements OnInit,Searchable<Hero>,Manageable<Hero> {

  heroSearch: HeroSearch;
  searchingAttribute: string = 'name';

  changeMediator: ModalMediator<Hero>;
  createMediator: ModalMediator<Hero>;
  alertMediator: AlertMediator;
  deleteMediator: DeleteMediator;
  categories:Category[];

  constructor(private _heroManage: HeroManagementService,private _categoryService:CategoryService) {
    super();
  }

  ngOnInit() {
    this.heroSearch = new HeroSearch(null,null,true);
    this.findEntities(this.selectedPage,this.pageSize,this.heroSearch);
  }

  findEntities(page: number, size: number, heroSearch: HeroSearch): void {
    this._heroManage.findHeroes(page,size,heroSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
      this._categoryService.getCategories().subscribe(data=>{
        this.categories=data;
      })
    });
  }

  createEntity(): void {
    this.createMediator = new ModalMediator<Hero>(true, null);
  }

  deleteEntity(entity: Hero): void {
    this.deleteMediator = new DeleteMediator(Messages.ARE_YOU_SURE_MESSAGE, true, entity.name);
  }

  changeEntity(entity: Hero): void {
    this.changeMediator = new ModalMediator<Hero>(true, entity);
  }

  onEntityChange(modalMediator: ModalMediator<Hero>): void {
    this.changeMediator = modalMediator;
    this.findEntities(this.selectedPage,this.pageSize,this.heroSearch);
  }

  onEntityCreate(modalMediator: ModalMediator<Hero>): void {
    this.createMediator = modalMediator;
    this.findEntities(this.selectedPage,this.pageSize,this.heroSearch);
  }

  onEntitySearching(searchValue: string) {
    this.heroSearch.name = searchValue;
    this.findEntities(this.selectedPage, this.pageSize, this.heroSearch);
  }

  onEntityChoosing(chosenEntity: Hero) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.findEntities(this.selectedPage, this.pageSize, this.heroSearch);
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  onDelete(deleteMediator: DeleteMediator) {
    this._heroManage.deleteHero(deleteMediator.entity).subscribe(response => {
      this.alertMediator = new AlertMediator(Messages.ENTITY_DELETED_SUCCESSFULLY, true, null);
      this.findEntities(this.selectedPage,this.pageSize,this.heroSearch);
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }
}
