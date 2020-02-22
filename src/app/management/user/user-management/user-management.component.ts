import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user';
import { List } from 'src/app/shared/other/list';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { DeleteMediator } from 'src/app/shared/model/delete-mediator';
import { Searchable } from 'src/app/shared/other/searchable';
import { Manageable } from 'src/app/shared/other/manageable';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { UserManagementService } from '../../service/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent extends List<User> implements OnInit,Searchable<User>,Manageable<User> {

  categorySearch: string;
  searchingAttribute: string = 'name';
  categoryMediator: ModalMediator<User>;
  alertMediator: AlertMediator;
  deleteMediator: DeleteMediator;

  constructor(private _categoryManage: UserManagementService) {
    super();
  }

  ngOnInit() {
    this.findEntities();
  }

  findEntities(): void {
    this._categoryManage.getSpecificUsers(null,null,null).subscribe(data => {
      this.entities = data;
      this.numberOfPages = 1;
    });
  }

  createEntity(): void {
    this.categoryMediator = new ModalMediator<User>(true, null);
  }

  deleteEntity(entity: User): void {
    this.alertMediator = new AlertMediator(Messages.ARE_YOU_SURE_MESSAGE, true, entity.username);
  }

  changeEntity(entity: User): void {
    this.categoryMediator = new ModalMediator<User>(true, entity);
  }


  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  onDelete(deleteMediator: DeleteMediator) {
    this._categoryManage.deleteUser(deleteMediator.entity).subscribe(response => {
      this.alertMediator = new AlertMediator(Messages.ENTITY_DELETED_SUCCESSFULLY, true, null);
      this.findEntities();
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }

  onEntityChange(modalMediator: ModalMediator<User>): void {
    this.categoryMediator = modalMediator;
    this.findEntities();
  }

  onEntityCreate(modalMediator: ModalMediator<User>): void {
    this.categoryMediator = modalMediator;
    this.findEntities();
  }

  onEntitySearching(searchValue: string) {
    if (searchValue) {
      this.entities = this.entities.filter(entity => entity.username.startsWith(searchValue));
      return;
    } this.findEntities();
  }

  onEntityChoosing(chosenEntity: User) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
  }
}
