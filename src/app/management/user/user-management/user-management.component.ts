import { Component, OnInit } from '@angular/core';
import { User, UserRole } from 'src/app/shared/model/user';
import { List } from 'src/app/shared/other/list';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { DeleteMediator } from 'src/app/shared/model/delete-mediator';
import { Searchable } from 'src/app/shared/other/searchable';
import { Manageable } from 'src/app/shared/other/manageable';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { UserManagementService } from '../../service/user-management.service';
import { UserSearch } from 'src/app/user/model/ user-search';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent extends List<User> implements OnInit,Searchable<User>,Manageable<User> {

  userSearch: UserSearch;
  searchingAttribute: string = 'username';

  changeMediator: ModalMediator<User>;
  createMediator: ModalMediator<User>;
  alertMediator: AlertMediator;
  deleteMediator: DeleteMediator;

  constructor(private _userManage: UserManagementService) {
    super();
  }

  ngOnInit() {
    this.userSearch = new UserSearch(null,null, true);
    this.findEntities();
  }

  findEntities(): void {
    this._userManage.findUsers(this.selectedPage, this.pageSize, this.userSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
    });
  }

  createEntity(): void {
    this.createMediator = new ModalMediator<User>(true, new User(null,null,false,null,[]));
  }

  deleteEntity(entity: User): void {
    this.deleteMediator = new DeleteMediator(Messages.ARE_YOU_SURE_MESSAGE, true, entity.username);
  }

  changeEntity(entity: User): void {
    this.changeMediator = new ModalMediator<User>(true, entity);
  }

  onEntityChange(modalMediator: ModalMediator<User>): void {
    this.changeMediator = modalMediator;
    this.findEntities();
  }

  onEntityCreate(modalMediator: ModalMediator<User>): void {
    this.createMediator = modalMediator;
    this.findEntities();
  }

  onEntitySearching(searchValue: string) {
    this.userSearch.username = searchValue;
    this.findEntities();
  }

  onEntityChoosing(chosenEntity: User) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.findEntities();
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  onDelete(deleteMediator: DeleteMediator) {
    this._userManage.deleteUser(deleteMediator.entity).subscribe(() => {
      this.alertMediator = new AlertMediator(Messages.ENTITY_DELETED_SUCCESSFULLY, true, null);
      this.findEntities();
    }, () => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }
}
