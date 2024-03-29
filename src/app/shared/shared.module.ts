import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling'
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RedZoomModule } from 'ngx-red-zoom';
import { AlertModule } from 'ngx-bootstrap/alert';

// directives
import { ClickDirective } from './directives/click.directive';
import { CollapseContentDirective, CollapseDirective, CollapseItemDirective } from './directives/collapse.directive';
import { DepartmentsAreaDirective } from './directives/departments-area.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { FakeSlidesDirective } from './directives/fake-slides.directive';
import { OutsideTouchClickDirective } from './directives/outside-touch-click.directive';
import { OwlPreventClickDirective } from './directives/owl-prevent-click.directive';
import { TouchClickDirective } from './directives/touch-click.directive';
import { AppFormatLetras } from './directives/solo-letras';
import { AppFormatRut } from './directives/format-rut.directive';
import { AppFormatTelefono } from './directives/telefono-validador';
// components
import { AlertComponent } from './components/alert/alert.component';
import { IconComponent } from './components/icon/icon.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductComponent } from './components/product/product.component';
import { QuickviewComponent } from './components/quickview/quickview.component';
import { SearchComponent } from './components/search/search.component';
import { ShareButtonsComponent } from './components/share-buttons/share-buttons.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { IconLogoPc } from './components/icon-logo-pc/icon.component';
// pipes
import { AbsoluteUrlPipe } from './pipes/absolute-url.pipe';
import { ColorTypePipe } from './pipes/color-type.pipe';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { currencyCLP } from './pipes/currency-clp.pipe'
import { telefono } from './pipes/telefono-format.pipe';


//Custom
//Componentes
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';

@NgModule({
    declarations: [
        // directives
        ClickDirective,
        CollapseContentDirective,
        CollapseDirective,
        CollapseItemDirective,
        DepartmentsAreaDirective,
        DropdownDirective,
        FakeSlidesDirective,
        OutsideTouchClickDirective,
        OwlPreventClickDirective,
        TouchClickDirective,
        AppFormatLetras,
        AppFormatRut,
        AppFormatTelefono,
        // components
        WhatsappButtonComponent,
        AlertComponent,
        IconComponent,
        InputNumberComponent,
        LoadingBarComponent,
        PageHeaderComponent,
        PostCardComponent,
        ProductCardComponent,
        ProductComponent,
        QuickviewComponent,
        SearchComponent,
        ShareButtonsComponent,
        SocialLinksComponent,
        IconLogoPc,
        // pipes
        AbsoluteUrlPipe,
        ColorTypePipe,
        CurrencyFormatPipe,
        ProductGalleryComponent,
        currencyCLP,
        telefono
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        // modules (third-party)
        ScrollingModule,
        CarouselModule,
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        RedZoomModule,
    ],
    exports: [
        // directives
        ScrollingModule,
        ClickDirective,
        CollapseContentDirective,
        CollapseDirective,
        CollapseItemDirective,
        DepartmentsAreaDirective,
        DropdownDirective,
        FakeSlidesDirective,
        OutsideTouchClickDirective,
        OwlPreventClickDirective,
        TouchClickDirective,
        AppFormatLetras,
        AppFormatRut,
        AppFormatTelefono,
        // components
        WhatsappButtonComponent,
        AlertComponent,
        IconComponent,
        InputNumberComponent,
        LoadingBarComponent,
        PageHeaderComponent,
        PostCardComponent,
        ProductCardComponent,
        ProductComponent,
        QuickviewComponent,
        SearchComponent,
        SocialLinksComponent,
        IconLogoPc,
        // pipes
        AbsoluteUrlPipe,
        ColorTypePipe,
        CurrencyFormatPipe,
        ShareButtonsComponent,
        currencyCLP,
        telefono
    ]
})
export class SharedModule { }
