import { Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { order } from '../../../../../data/account-order-details';
import { SharingService } from 'src/app/core/services/sharing.services';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-order-details',
    templateUrl: './page-order-details.component.html',
    styleUrls: ['./page-order-details.component.scss']
})
export class PageOrderDetailsComponent {
    order: Order = order;

    Usuario$: Observable<Usuario>;

    constructor(private shopService: ShopService, private sharingService: SharingService, private router: Router) {
      this.Usuario$ = sharingService.sharingObservable;
    }

    ngOnInit() {

    }
}
