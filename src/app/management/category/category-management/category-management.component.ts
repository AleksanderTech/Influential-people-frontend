import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/model/category';
import { List } from 'src/app/shared/other/list';
import { CategoryManagementService } from '../../service/category-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { Searchable } from 'src/app/shared/other/searchable';
import { Manageable } from 'src/app/shared/other/manageable';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { DeleteMediator } from 'src/app/shared/model/delete-mediator';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent extends List<Category> implements OnInit, Searchable<Category>, Manageable<Category> {

  categorySearch: string;
  searchingAttribute: string = 'name';

  changeMediator: ModalMediator<Category>;
  createMediator: ModalMediator<Category>;
  alertMediator: AlertMediator;
  deleteMediator: DeleteMediator;

  constructor(private _categoryManage: CategoryManagementService) {
    super();
  }

  ngOnInit() {
    this.findEntities();
  }

  findEntities(): void {
    this._categoryManage.findCategories().subscribe(data => {
      this.entities = data;
      this.numberOfPages = 1;
    });
  }

  createEntity(): void {
    this.createMediator = new ModalMediator<Category>(true, null);
  }

  deleteEntity(entity: Category): void {
    this.deleteMediator = new DeleteMediator(Messages.ARE_YOU_SURE_MESSAGE, true, entity.name);
  }

  changeEntity(entity: Category): void {
    this.changeMediator = new ModalMediator<Category>(true, entity);
  }

  onEntityChange(modalMediator: ModalMediator<Category>): void {
    this.changeMediator = modalMediator;
    this.findEntities();
  }

  onEntityCreate(modalMediator: ModalMediator<Category>): void {
    this.createMediator = modalMediator;
    this.findEntities();
  }

  onEntitySearching(searchValue: string) {
    if (searchValue) {
      this.entities = this.entities.filter(entity => entity.name.startsWith(searchValue));
      return;
    } this.findEntities();
  }

  onEntityChoosing(chosenEntity: Category) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
  }


  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  onDelete(deleteMediator: DeleteMediator) {
    this._categoryManage.deleteCategory(deleteMediator.entity).subscribe(response => {
      this.alertMediator = new AlertMediator(Messages.ENTITY_DELETED_SUCCESSFULLY, true, null);
      this.findEntities();
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }
}
