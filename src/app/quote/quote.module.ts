import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteDetailComponent } from './quote-detail/quote-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    QuoteListComponent,
    QuoteDetailComponent
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuoteModule { }
