import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/components/login/login.component';
import { LogoutComponent } from './account/components/logout/logout.component';
import { AuthRedirectorService } from './account/services/auth-redirector.service';
import { RegistrationComponent } from './account/components/registration/registration.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthRedirectorService]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
