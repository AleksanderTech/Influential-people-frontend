import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { User } from 'src/app/shared/model/user';
import { UserSearch } from 'src/app/user/model/ user-search';
import { NewUser } from '../user/model/new-user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private _httpClient: HttpClient) { }

  findUsers(page: number = 0, size: number = 10, userSearch: UserSearch): Observable<User[]> {
    let url = Urls.ROOT_REST_URL + Urls.USER + Urls.SEARCH_SORT_FILTER;
    url = url + userSearch.toQuery();
    url = url + '&page=' + page + '&size=' + size;
    return this._httpClient.get<User[]>(url);
  }

  createUser(user: NewUser): Observable<User> {
    return this._httpClient.post<User>(Urls.ROOT_REST_URL + Urls.USER, user);
  }

  deleteUser(username: string): Observable<User> {
    return this._httpClient.delete<User>(Urls.ROOT_REST_URL + Urls.USER + "/" + username);
  }
}
