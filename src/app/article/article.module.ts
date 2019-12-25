import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleTileComponent } from './article-tile/article-tile.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleDetailComponent,
    ArticleListComponent,
    ArticleTileComponent,
    CommentComponent,
    CommentListComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    ArticleRoutingModule,
    RouterModule
  ]
})
export class ArticleModule { }
