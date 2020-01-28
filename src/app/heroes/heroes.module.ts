import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router';
import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeroTileComponent } from './hero-tile/hero-tile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryModule } from '../category/category.module';


@NgModule({
  declarations: [
    HeroListComponent,
    HeroDetailComponent,
    HeroTileComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeroesRoutingModule,
    CommonModule,
    SharedModule,
    CategoryModule
  ]
})
export class HeroesModule { }
