import { Component } from '@angular/core';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { Product } from '../../../../shared/interfaces/product';
import { CartService } from '../../../../shared/services/cart.service';
import { RootService } from '../../../../shared/services/root.service';
import { SharingService } from 'src/app/core/services/sharing.services';

@Component({
    selector: 'app-wishlist',
    templateUrl: './page-logout.component.html',
    styleUrls: ['./page-logout.component.scss']
})
export class PageLogoutComponent {
    constructor(
        public root: RootService,
        public cart: CartService,
        private sharingService: SharingService
    ) {
        this.sharingService.cerrarSesion();
        window.location.href = '/'

     }


}
