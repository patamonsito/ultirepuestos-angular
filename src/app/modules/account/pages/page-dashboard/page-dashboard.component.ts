import { Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';
import { Address } from '../../../../shared/interfaces/address';
import { addresses } from '../../../../../data/account-addresses';
import { SharingService } from 'src/app/core/services/sharing.services';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Direcciones } from 'src/app/shared/interfaces/direcciones';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.sass']
})
export class PageDashboardComponent {
    address: Direcciones;

    orders: Partial<Order>[] = orders.slice(0, 3);

    Usuario$: Observable<Usuario>;

    constructor(private shopService: ShopService, private sharingService: SharingService, private router: Router,private route: ActivatedRoute) {
      this.Usuario$ = sharingService.sharingObservable;
      this.address = {
        Nombre: '',
        Apellido: '',
        Rut: '',
        Telefono: '',
        Region: '',
        Comuna: '',
        Calle: '',
        Numero: '',
    };
    }
    ngOnInit() {
        this.Usuario$.subscribe({
            next: e => {
                if(!e){
                    this.router.navigate(['../../'], {relativeTo: this.route}).then();
                }
                this.address = e.Direcciones.filter((e: any) => {
                if(e.Default == true){
                    return e;
                }
            })[0];
        },
    })

    }
}
