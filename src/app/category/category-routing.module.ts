import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRedirectorService } from '../core/services/auth-redirector.service';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';


const routes: Routes = [

  { path: '', component: CategoryListComponent, canActivate: [AuthRedirectorService] },
  { path: 'categories/:name', component: CategoryDetailComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
