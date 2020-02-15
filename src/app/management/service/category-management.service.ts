import { Injectable } from '@angular/core';
import { Category } from 'src/app/category/model/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {

  constructor(private _httpClient:HttpClient) { }

  getCategories(): Observable<Category[]> {
    let url = Urls.ROOT_REST_URL + Urls.CATEGORY;
    return this._httpClient.get<Category[]>(url);
  }

  addCategory(category:Category):Observable<Category>{
    return this._httpClient.post<Category>(Urls.ROOT_REST_URL + Urls.CATEGORY,Category);
  }

  deleteCategory(CategoryName:string):Observable<Category>{
    return this._httpClient.delete<Category>(Urls.ROOT_REST_URL + Urls.CATEGORY + "/" + CategoryName);
  }
}
