import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRedirectorService } from '../core/services/auth-redirector.service';
import { PanelManagementComponent } from './panel-management/panel-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HeroManagementComponent } from './hero-management/hero-management.component';
import { QuoteManagementComponent } from './quote-management/quote-management.component';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';


const routes: Routes = [
  { path: '', component: PanelManagementComponent, canActivate: [AuthRedirectorService] },
  { path: 'user', component: UserManagementComponent, canActivate: [AuthRedirectorService] },
  { path: 'hero', component: HeroManagementComponent, canActivate: [AuthRedirectorService] },
  { path: 'quote', component: QuoteManagementComponent, canActivate: [AuthRedirectorService] },
  { path: 'article', component: ArticleManagementComponent, canActivate: [AuthRedirectorService] },
  { path: 'category', component: CategoryManagementComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
