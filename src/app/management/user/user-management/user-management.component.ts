import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user';
import { List } from 'src/app/shared/other/list';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { Messages } from 'src/app/shared/constants/messages';
import { UserManagementService } from '../../service/user-management.service';
import { UserSearch } from 'src/app/user/model/ user-search';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent extends List<User> implements OnInit {

  searchingAttribute: string = 'username';
  modal: Modal;
  userSearch:UserSearch;

  constructor(private _userManage: UserManagementService) {
    super();
  }

  ngOnInit() {
    this.userSearch = new UserSearch();
    this.getSpecificUsers(this.selectedPage, this.pageSize,this.userSearch);
  }

  getSpecificUsers(page: number, size: number,userSearch:UserSearch) {
    this._userManage.getSpecificUsers(page, size,userSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
    });
  }

  newUser() {
    this.modal = new Modal(ModalType.INFO, 'new user', true, null);
  }

  deleteUser(user: User) {
    this.modal = new Modal(ModalType.WARN, Messages.ARE_YOU_SURE_MESSAGE, true, null);
  }

  editUser(user: User) {
    this.modal = new Modal(ModalType.INFO, 'edit user', true, null);
  }

  onModalSubmitting(modal: Modal) {
    console.log('Modal submitted');
    this.modal = modal;
  }

  onEntitySearching(searchValue: string) {
    this.userSearch.username = searchValue;
    this.getSpecificUsers(this.selectedPage, this.pageSize,this.userSearch);
  }

  onEntityChoosing(chosenEntity: User) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificUsers(this.selectedPage, this.pageSize,this.userSearch);
  }
}
