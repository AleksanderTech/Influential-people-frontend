import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRedirectorService } from '../core/services/auth-redirector.service';
import { CategoryListComponent } from './category-list/category-list.component';


const routes: Routes = [
  { path: '', component: CategoryListComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
