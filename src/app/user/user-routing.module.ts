import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AuthRedirectorService } from '../core/services/auth-redirector.service';


const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
