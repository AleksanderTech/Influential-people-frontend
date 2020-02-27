import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'hero',
    loadChildren: () => import('./heroes/heroes.module').then(mod => mod.HeroesModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(mod => mod.ArticleModule)
  },
  {
    path: 'quote',
    loadChildren: () => import('./quote/quote.module').then(mod => mod.QuoteModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(mod => mod.CategoryModule)
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then(mod => mod.ManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
