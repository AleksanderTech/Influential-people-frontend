import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { PanelManagementComponent } from './panel-management/panel-management.component';
import { SharedModule } from '../shared/shared.module';
import { HeroManagementComponent } from './hero-management/hero-management.component';
import { QuoteManagementComponent } from './quote-management/quote-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';


@NgModule({
  declarations: [PanelManagementComponent, HeroManagementComponent, QuoteManagementComponent, UserManagementComponent, ArticleManagementComponent, CategoryManagementComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule { }
