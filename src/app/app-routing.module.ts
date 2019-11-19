import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/components/login/login.component';
import { LogoutComponent } from './account/components/logout/logout.component';
import { AuthRedirectorService } from './account/services/auth-redirector.service';
import { RegistrationComponent } from './account/components/registration/registration.component';
import { RegistrationMessageComponent } from './account/components/registration-message/registration-message.component';
import { WelcomeComponent } from './start/components/welcome.component';
import { HeroListComponent } from './core/hero/hero-list/hero-list.component';
import { HeroDetailComponent } from './core/hero/hero-detail/hero-detail.component';
import { ArticleListComponent } from './core/article/article-list/article-list.component';
import { QuoteListComponent } from './core/quote/quote-list/quote-list.component';
import { QuoteDetailComponent } from './core/quote/quote-detail/quote-detail.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthRedirectorService] },
  { path: 'heroes', component: HeroListComponent, canActivate: [AuthRedirectorService] },
  { path: 'articles', component: ArticleListComponent, canActivate: [AuthRedirectorService] },
  { path: 'quotes', component: QuoteListComponent, canActivate: [AuthRedirectorService] },
  { path: 'heroes/:name/detail', component: HeroDetailComponent, canActivate: [AuthRedirectorService] },
  { path: 'quotes/:id/detail', component: QuoteDetailComponent, canActivate: [AuthRedirectorService] },
  { path: 'sign-up/message', component: RegistrationMessageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
