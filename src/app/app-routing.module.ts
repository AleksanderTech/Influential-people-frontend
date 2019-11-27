import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthRedirectorService } from './core/services/auth-redirector.service';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(mod => mod.HeroesModule),
    canLoad: [AuthRedirectorService]
  },
  {
    path: 'articles',
    loadChildren: () => import('./article/article.module').then(mod => mod.ArticleModule)
  },
  {
    path: 'quotes',
    loadChildren: () => import('./quote/quote.module').then(mod => mod.QuoteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
