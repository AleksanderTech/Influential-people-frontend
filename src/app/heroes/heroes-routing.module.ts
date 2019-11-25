import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { AuthRedirectorService } from '../account/services/auth-redirector.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const heroesRoutes: Routes = [
    { path: 'heroes', component: HeroListComponent, canActivate: [AuthRedirectorService] },
    { path: 'heroes/:name/detail', component: HeroDetailComponent, canActivate: [AuthRedirectorService] },
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
