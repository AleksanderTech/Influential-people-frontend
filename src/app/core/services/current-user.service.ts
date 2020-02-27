import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from 'src/app/shared/model/current-user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private _currentUserSubject = new BehaviorSubject<CurrentUser>(new CurrentUser());
  currentUserObservable = this._currentUserSubject.asObservable();

  constructor() { }

  getCurrentUser(): CurrentUser {
    return this._currentUserSubject.getValue();
  }

  saveCurrentUser(user: CurrentUser): void {
    user.token=this.getCurrentUser().token;
    this._currentUserSubject.next(user);
  }

  saveToken(token: string): void {
    let currentUser = this._currentUserSubject.getValue();
    currentUser.token = token;
    this._currentUserSubject.next(currentUser);
  }
}
