import { Component } from '@angular/core';
import { ShopService } from 'src/app/shared/api/shop.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-track-order',
    templateUrl: './page-track-order.component.html',
    styleUrls: ['./page-track-order.component.scss']
})
export class PageTrackOrderComponent {
    errorSeguimiento: any = '';
    formOrden: any;

    constructor(private shopService: ShopService) {

        this.formOrden = new FormGroup({
            Orden: new FormControl('', [Validators.required]),
        });

        
    }


    searchOrden(){

        this.shopService.getTrackCode(this.Orden?.value).subscribe((e: any) => {
            if(e){
                let uri = '/#/shop/cart/checkout/success?reference='+this.Orden?.value;
                console.log(uri);
                return window.location.href = uri;
            }else{
                return this.errorSeguimiento = 'Codigo Invalido.'
            }
        })
    }

    get Orden(){
        return this.formOrden.get('Orden');
    }



}
