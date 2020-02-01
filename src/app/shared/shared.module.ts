import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchFilterPipe } from './pipes/filter-pipe';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { DefaultPipe } from './pipes/default-pipe';
import { ClickOutsideDirective } from './directives/dropdown.directive';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    PaginatorComponent,
    SearchFilterPipe,
    DefaultPipe,
    SearchComponent,
    SortComponent,
    ClickOutsideDirective,
    TruncatePipe
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    PaginatorComponent,
    SearchFilterPipe,
    DefaultPipe,
    TruncatePipe,
    SearchComponent,
    SortComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
