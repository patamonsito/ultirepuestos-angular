import { Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';
import { SharingService } from 'src/app/core/services/sharing.services';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-orders-list',
    templateUrl: './page-orders-list.component.html',
    styleUrls: ['./page-orders-list.component.sass']
})
export class PageOrdersListComponent {
    orders: Partial<Order>[] = orders;

    Usuario$: Observable<Usuario>;

    constructor(private shopService: ShopService, private sharingService: SharingService, private router: Router) {
      this.Usuario$ = sharingService.sharingObservable;
    }

    ngOnInit() {

    }
}
