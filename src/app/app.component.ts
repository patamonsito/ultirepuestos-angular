import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './shared/services/cart.service';
import { CompareService } from './shared/services/compare.service';
import { WishlistService } from './shared/services/wishlist.service';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { CurrencyService } from './shared/services/currency.service';
import { filter, first } from 'rxjs/operators';
import { SharingService } from './core/services/sharing.services';
import { Usuario } from './shared/interfaces/usuario';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private sharingService: SharingService,
        private router: Router,
        private toastr: ToastrService,
        private cart: CartService,
        private compare: CompareService,
        private wishlist: WishlistService,
        private zone: NgZone,
        private scroller: ViewportScroller,
        private currency: CurrencyService
    ) {

        let data: any;

        if (typeof localStorage !== 'undefined') {
            // Accede a localStorage aquí
            data = localStorage.getItem('Usuario')
        }else{
            data = '{}'
        }
        
        sharingService.sharingObservableData = JSON.parse(data)

        
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.router.events.pipe(filter(event => event instanceof NavigationEnd), first()).subscribe(() => {
                    const preloader = document.querySelector('.site-preloader');

                    if (preloader === null) {
                        return;
                    }

                    preloader.addEventListener('transitionend', (event: Event) => {
                        if (event instanceof TransitionEvent && event.propertyName === 'opacity') {
                            preloader.remove();
                        }
                    });
                    preloader.classList.add('site-preloader__fade');

                    // Sometimes, due to unexpected behavior, the browser (in particular Safari) may not play the transition, which leads
                    // to blocking interaction with page elements due to the fact that the preloader is not deleted.
                    // The following block covers this case.
                    if (getComputedStyle(preloader).opacity === '0' && preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                });
            });
        }
    }

    ngOnInit(): void {
        // properties of the CurrencyFormatOptions interface fully complies
        // with the arguments of the built-in pipe "currency"
        // https://angular.io/api/common/CurrencyPipe
        this.currency.options = {
            code: 'CLP',
            display: 'symbol-narrow',
            // digitsInfo: '0',
            // locale: 'fr-FR'
        };

        this.router.events.subscribe((event) => {
            if ((event instanceof NavigationEnd)) {
                this.scroller.scrollToPosition([0, 0]);
            }
        });
        this.cart.onAdding$.subscribe(product => {
            this.toastr.success(`"${product.name}" se ha añadido al carrito!`);
        });
        this.compare.onAdding$.subscribe(product => {
            this.toastr.success(`"${product.name}" se añadio a la lista de comparar!`);
        });
        this.wishlist.onAdding$.subscribe(product => {
            this.toastr.success(`"${product.name}" se añadio a la lista de deseos!`);
        });
    }
}
