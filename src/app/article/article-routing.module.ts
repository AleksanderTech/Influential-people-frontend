import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: ArticleListComponent, canActivate: [AuthGuard] },
  { path: 'article/:id', component: ArticleDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
