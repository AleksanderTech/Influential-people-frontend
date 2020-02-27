import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AuthGuard } from '../core/guards/auth.guard';

const heroesRoutes: Routes = [
    { path: '', component: HeroListComponent, canActivate: [AuthGuard] },
    { path: 'hero/:name', component: HeroDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(heroesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HeroesRoutingModule { }
