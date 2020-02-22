import { Injectable } from '@angular/core';
import { Category } from 'src/app/category/model/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { NewCategory } from '../category/model/new-category';
import { ChangeCategory } from '../category/model/change-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {

  constructor(private _httpClient: HttpClient) { }

  findCategories(): Observable<Category[]> {
    let url = Urls.ROOT_REST_URL + Urls.CATEGORY;
    return this._httpClient.get<Category[]>(url);
  }

  createCategory(category: NewCategory): Observable<Category> {
    return this._httpClient.post<Category>(Urls.ROOT_REST_URL + Urls.CATEGORY, category);
  }

  changeCategory(name: string,category: ChangeCategory): Observable<Category> {
    return this._httpClient.patch<Category>(Urls.ROOT_REST_URL + Urls.CATEGORY + "/" + name, category);
  }

  deleteCategory(name: string): Observable<Category> {
    return this._httpClient.delete<Category>(Urls.ROOT_REST_URL + Urls.CATEGORY + "/" + name);
  }

  uploadImage(name: string, formData: FormData): Observable<void> {
    return this._httpClient.put<void>(Urls.ROOT_REST_URL + Urls.CATEGORY + "/" + name + Urls.IMAGE, formData);
  }
}
