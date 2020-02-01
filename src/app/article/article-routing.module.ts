import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AuthRedirectorService } from '../core/services/auth-redirector.service';


const routes: Routes = [
  { path: '', component: ArticleListComponent, canActivate: [AuthRedirectorService] },
  { path: 'article/:heroName', component: ArticleListComponent, canActivate: [AuthRedirectorService] },
  { path: 'article/:id/detail', component: ArticleDetailComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
