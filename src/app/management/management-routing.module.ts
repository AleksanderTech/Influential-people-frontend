import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelManagementComponent } from './panel-management/panel-management.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { HeroManagementComponent } from './hero/hero-management/hero-management.component';
import { QuoteManagementComponent } from './quote/quote-management/quote-management.component';
import { ArticleManagementComponent } from './article/article-management/article-management.component';
import { CategoryManagementComponent } from './category/category-management/category-management.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: PanelManagementComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'hero', component: HeroManagementComponent, canActivate: [AuthGuard] },
  { path: 'quote', component: QuoteManagementComponent, canActivate: [AuthGuard] },
  { path: 'article', component: ArticleManagementComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryManagementComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
