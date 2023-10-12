import { NgModule } from '@angular/core';

// modules (angular)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';

// modules
import { AppRoutingModule } from './app-routing.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { FooterModule } from './modules/footer/footer.module';
import { HeaderModule } from './modules/header/header.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { SharedModule } from './shared/shared.module';
import { WidgetsModule } from './modules/widgets/widgets.module';

// components
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';

// pages
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { PageOffcanvasCartComponent } from './pages/page-offcanvas-cart/page-offcanvas-cart.component';
import { CoreModule } from './core/core.module';

import { SharingService } from 'src/app/core/services/sharing.services'
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        // components
        AppComponent,
        RootComponent,
        // pages
        PageHomeOneComponent,
        PageOffcanvasCartComponent
    ],
    imports: [
        // modules (angular)
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // modules
        CarouselModule,
        ToastrModule.forRoot(),
        // modules
        AppRoutingModule,
        BlocksModule,
        FooterModule,
        HeaderModule,
        MobileModule,
        SharedModule,
        WidgetsModule,
        CoreModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        SharingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
