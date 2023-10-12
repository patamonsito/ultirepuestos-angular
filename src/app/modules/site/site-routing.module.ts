import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAboutUsComponent } from './pages/page-about-us/page-about-us.component';
import { PageTermsComponent } from './pages/page-terms/page-terms.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about-us'
    },
    {
        path: 'about-us',
        component: PageAboutUsComponent
    },
    {
        path: 'terms',
        component: PageTermsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }
