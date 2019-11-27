import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router';
import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  imports: [
    RouterModule,
    HeroesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class HeroesModule { }
