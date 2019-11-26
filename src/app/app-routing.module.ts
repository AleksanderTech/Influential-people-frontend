import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { LogoutComponent } from './core/auth/components/logout/logout.component';
import { AuthRedirectorService } from './core/auth/services/auth-redirector.service';
import { RegistrationComponent } from './core/auth/components/registration/registration.component';
import { RegistrationMessageComponent } from './core/auth/components/registration-message/registration-message.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthRedirectorService] },
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
