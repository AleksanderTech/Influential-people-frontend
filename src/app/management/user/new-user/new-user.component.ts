import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { User, UserRole } from 'src/app/shared/model/user';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { UserManagementService } from '../../service/user-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { NewUser } from '../model/new-user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  @Input('createMediator') createMediator: ModalMediator<NewUser>;
  @Output('userCreated') userCreated: EventEmitter<ModalMediator<User>> = new EventEmitter<ModalMediator<User>>();
  alertMediator: AlertMediator;
  roles: Map<string, boolean>;

  constructor(private userManagement: UserManagementService) { }

  ngOnInit(): void {
    this.roles = new Map<string, boolean>();
    this.roles.set(UserRole[UserRole.ROLE_USER].toString(), false);
    this.roles.set(UserRole[UserRole.ROLE_ADMIN].toString(), false);
  }

  create() {
    this.createMediator.entity.roles = this.extractList(this.roles);
    console.log(this.createMediator.entity);

    if (!this.isValid(this.createMediator.entity)) {
      this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return;
    }
    this.userManagement.createUser(this.createMediator.entity).subscribe(data => {
      this.userCreated.emit(this.createMediator);
      this.alertMediator = new AlertMediator(Messages.ENTITY_CREATED_SUCCESSFULLY, true, null);
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }

  extractList(map: Map<string, boolean>): any[] {
    return new Array(...map).filter((pairs) => pairs[1]).map(pairs => pairs[0]);
  }

  resize(textArea: HTMLBaseElement) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  isValid(user: NewUser): boolean {
    if (!(user.username || user.username.length < 0)) {
      return false;
    }
    if (!(user.password || user.password.length < 0)) {
      return false;
    }
    if (!(user.email.match("(.)+[@][^@]+[.][a-zA-Z0-9]+"))) {
      return false;
    }
    if (!user.roles || user.roles.length < 0) {
      return false;
    }
    return true;
  }

  close() {
    this.createMediator.display = false;
    this.createMediator.isSubmitted = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
