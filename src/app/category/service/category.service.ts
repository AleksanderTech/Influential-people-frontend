import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategory(name: string): Observable<Category> {
    return this.httpClient.get<Category>(Urls.ROOT_REST_URL + Urls.CATEGORY + '/' + name);
  }
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(Urls.ROOT_REST_URL + Urls.CATEGORY);
  }
}
