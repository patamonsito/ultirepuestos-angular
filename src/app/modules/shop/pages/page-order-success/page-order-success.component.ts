import { Component } from '@angular/core';
import { order } from '../../../../../data/account-order-details';
import { Order } from '../../../../shared/interfaces/order';
import { RootService } from '../../../../shared/services/root.service';
import { ShopService } from 'src/app/shared/api/shop.service';

@Component({
    selector: 'app-page-order-success',
    templateUrl: './page-order-success.component.html',
    styleUrls: ['./page-order-success.component.scss']
})
export class PageOrderSuccessComponent {
    orden: any;
    loader: boolean = false;
    metodoPago: string = '';
    metodos: string[] = [
        'Getnet',
        'WebPay Plus',
        'Transferencia Bancaria'
    ]

    constructor(
        public root: RootService,
        private shopService: ShopService,
    ) { 

        let code = window.location.href.split('reference=')[window.location.href.split('reference=').length - 1];

        this.shopService.getFacturacion(code).subscribe((e: any) =>{
            this.orden = e;
            this.metodoPago = e.metodoPago;
            this.loader = true
        })

    }

    copyDates(){
        const VALUE = `77612907-0
Santander
Cuenta Corriente
88900030`
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = VALUE;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

    }

}
