import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteDetailComponent } from './quote-detail/quote-detail.component';
import { AuthRedirectorService } from '../core/services/auth-redirector.service';


const routes: Routes = [
  { path: '', component: QuoteListComponent, canActivate: [AuthRedirectorService] },
  { path: 'quote/:heroName', component: QuoteListComponent, canActivate: [AuthRedirectorService] },
  { path: 'quote/:id/detail', component: QuoteDetailComponent, canActivate: [AuthRedirectorService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
