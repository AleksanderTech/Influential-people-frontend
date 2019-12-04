import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleTileComponent } from './article-tile/article-tile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ArticleDetailComponent,
    ArticleListComponent,
    ArticleTileComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
