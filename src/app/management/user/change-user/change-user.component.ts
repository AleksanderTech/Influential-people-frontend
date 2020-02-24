import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { User, UserRole } from 'src/app/shared/model/user';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { UserManagementService } from '../../service/user-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { NewUser } from '../model/new-user';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.css']
})
export class ChangeUserComponent implements OnChanges {

  @Input('changeMediator') changeMediator: ModalMediator<User>;
  @Output('userChanged') userChanged: EventEmitter<ModalMediator<User>> = new EventEmitter<ModalMediator<User>>();
  alertMediator: AlertMediator;
  roles: Map<string, boolean>;

  constructor(private userManagement: UserManagementService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.roles = new Map<string, boolean>();
    this.roles.set(UserRole[UserRole.ROLE_USER].toString(), false);
    this.roles.set(UserRole[UserRole.ROLE_ADMIN].toString(), false);
    this.changeMediator = changes.changeMediator.currentValue;
    for (const key of this.roles.keys()) {
      if (this.changeMediator.entity.roles.includes(key)) {
        this.roles.set(key, true);
      }
    }
  }

  change() {
    this.changeMediator.entity.roles = this.extractList(this.roles);
    if (!this.isValid(this.changeMediator.entity)) {
      this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return;
    }
    this.userManagement.changeUser(this.changeMediator.entity.username, this.changeMediator.entity).subscribe(data => {
      this.userChanged.emit(this.changeMediator);
      this.alertMediator = new AlertMediator(Messages.ENTITY_CHANGED_SUCCESSFULLY, true, null);
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
    if ((!user.username) || (user.username.length < 0)) {
      return false;
    }
    if ((!user.password) || (user.password.length < 0)) {
      return false;
    }
    if (!(user.email.match("(.)+[@][^@]+[.][a-zA-Z0-9]+"))) {
      return false;
    }
    if ((!user.roles) || (user.roles.length < 0)) {
      return false;
    }
    return true;
  }

  close() {
    this.changeMediator.display = false;
    this.changeMediator.isSubmitted = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
