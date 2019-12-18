import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryTileComponent } from './category-tile/category-tile.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';



@NgModule({
  declarations: [CategoryListComponent, CategoryTileComponent, CategoryDetailComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
