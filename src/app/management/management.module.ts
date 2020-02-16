import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { PanelManagementComponent } from './panel-management/panel-management.component';
import { SharedModule } from '../shared/shared.module';
import { HeroManagementComponent } from './hero/hero-management/hero-management.component';
import { QuoteManagementComponent } from './quote/quote-management/quote-management.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { ArticleManagementComponent } from './article/article-management/article-management.component';
import { CategoryManagementComponent } from './category/category-management/category-management.component';
import { NewHeroComponent } from './hero/new-hero/new-hero.component';
import { NewQuoteComponent } from './quote/new-quote/new-quote.component';
import { NewArticleComponent } from './article/new-article/new-article.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { NewCategoryComponent } from './category/new-category/new-category.component';
import { ChangeCategoryComponent } from './category/change-category/change-category.component';
import { ChangeUserComponent } from './user/change-user/change-user.component';
import { ChangeHeroComponent } from './hero/change-hero/change-hero.component';
import { ChangeArticleComponent } from './article/change-article/change-article.component';
import { ChangeQuoteComponent } from './quote/change-quote/change-quote.component';


@NgModule({
  declarations: [PanelManagementComponent, HeroManagementComponent, QuoteManagementComponent, UserManagementComponent, ArticleManagementComponent, CategoryManagementComponent, NewHeroComponent, NewQuoteComponent, NewArticleComponent, NewUserComponent, NewCategoryComponent, ChangeCategoryComponent, ChangeUserComponent, ChangeHeroComponent, ChangeArticleComponent, ChangeQuoteComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule { }
