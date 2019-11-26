import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AuthRedirectorService } from '../core/auth/services/auth-redirector.service';


const routes: Routes = [
  { path: '', component: ArticleDetailComponent },
  { path: 'articles', component: ArticleListComponent, canActivate: [AuthRedirectorService] },
  { path: 'articles/:id/detail', component: ArticleDetailComponent, canActivate: [AuthRedirectorService] },
  { path: '', component: ArticleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
