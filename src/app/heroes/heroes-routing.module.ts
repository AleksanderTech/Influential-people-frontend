import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { AuthRedirectorService } from '../core/services/auth-redirector.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const heroesRoutes: Routes = [
    { path: '', component: HeroListComponent, canActivate: [AuthRedirectorService] },
    { path: ':categoryName', component: HeroListComponent, canActivate: [AuthRedirectorService] },
    { path: ':name/detail', component: HeroDetailComponent, canActivate: [AuthRedirectorService] },

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
