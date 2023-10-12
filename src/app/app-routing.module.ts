import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { RootComponent } from './components/root/root.component';


const routes: Routes = [
    {
        path: '',
        component: RootComponent,
        data: {
            headerLayout: 'classic',
            dropcartType: 'dropdown'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: PageHomeOneComponent
            },
            {
                path: 'shop',
                loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'site',
                loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule)
            },
            {
                path: '**',
                redirectTo: '/'
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
    exports: [RouterModule]
}) 
export class AppRoutingModule { }
