import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationMessageComponent } from '../user/components/registration-message/registration-message.component';
import { LoginComponent } from '../user/components/login/login.component';
import { RegistrationComponent } from '../user/components/registration/registration.component';
import { LogoutComponent } from '../user/components/logout/logout.component';
import { AuthRedirectorService } from './services/auth-redirector.service';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  // { path: 'sign-up/message/', component: RegistrationMessageComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'sign-up', component: RegistrationComponent },
  // { path: 'logout', component: LogoutComponent, canActivate: [AuthRedirectorService] },
  // { path: 'home', component: HomeComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
