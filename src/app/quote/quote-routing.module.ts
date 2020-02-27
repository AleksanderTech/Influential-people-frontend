import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteDetailComponent } from './quote-detail/quote-detail.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: QuoteListComponent, canActivate: [AuthGuard] },
  { path: 'quote/:id', component: QuoteDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
