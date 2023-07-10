import { Component, ViewChild, ElementRef } from '@angular/core';
import { RootService } from '../../../../shared/services/root.service';
import { ShopService } from 'src/app/shared/api/shop.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharingService } from 'src/app/core/services/sharing.services';
import { Usuario } from 'src/app/shared/interfaces/usuario';




@Component({
    selector: 'app-page-order-success',
    templateUrl: './page-order-success.component.html',
    styleUrls: ['./page-order-success.component.scss']
})
export class PageOrderSuccessComponent {
    @ViewChild('dateDespacho') dateDespacho: ElementRef;
    @ViewChild('f') form: ElementRef;
    @ViewChild('i') input: ElementRef;
    orden: any;
    loader: boolean = false;
    metodoPago: string = '';
    metodos: string[] = [
        'Getnet',
        'WebPay Plus',
        'Mercadopago',
        'Transferencia Bancaria'
    ]
    formMetodoP: FormGroup;
    code: string;
    usuarioId: any;
    Usuario$: Observable<Usuario>;
    formFacturacion: FormGroup;
    minDespacho: any;
    maxDespacho: any;
    token = '';
    url = '';
    constructor(
        public root: RootService,
        private shopService: ShopService,
        private sharingService: SharingService
    ) { 

        
        // this.formFacturacion = new FormGroup({
        //     FechaDespacho: new FormControl( null, [Validators.required ])
        // });
        
        
        
        this.Usuario$ = sharingService.sharingObservable;
        


        this.code = window.location.href.split('reference=')[window.location.href.split('reference=').length - 1].slice(0, 10);

        this.shopService.getFacturacion(this.code).subscribe((e: any) =>{
                
                this.orden = e;
                this.metodoPago = e.metodoPago;
                this.loader = true
            
    
                this.formMetodoP = new FormGroup({
                    MetodoP: new FormControl(this.metodoPago),
                })
        
        
                this.MetodoP?.setValue(this.metodoPago);
        
                console.log(this.MetodoP?.value, this.metodoPago, 'ambos no dicen nada?')   
                 
        
        })



    }


    openDatepicker(){
        this.dateDespacho.nativeElement.showPicker()
    }

    ngInit(){
        this.Usuario$.subscribe({
            next: e => {
                this.usuarioId = e.id
        },
        })
    }

    ngAfterViewInit() {
        //get your element here
        // let today = new Date();
        // let minDespacho: any;
        // let maxDespacho: any;
        // let saveMinDespacho: any;
        // if(today.getDay() == 5){
        //     minDespacho = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
        //     saveMinDespacho = new Date(minDespacho)
        // }else if(today.getDay() == 6){
        //     minDespacho = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
        //     saveMinDespacho = new Date(minDespacho)
        // }else{
        //     minDespacho = new Date(today.setDate(today.getDate())).toISOString().split('T')[0];
        //     saveMinDespacho = new Date(minDespacho)
        // }

        // // Maxima fecha
        // if(saveMinDespacho.getDay() == 1){
        //     maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 3)).toISOString().split('T')[0];
        // }else if(saveMinDespacho.getDay() == 2){
        //     maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 2)).toISOString().split('T')[0];
        // }else if(saveMinDespacho.getDay() == 3){
        //     maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 1)).toISOString().split('T')[0];
        // }else{
        //     maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 4)).toISOString().split('T')[0];
        // }
        // this.minDespacho = minDespacho;
        // this.maxDespacho = maxDespacho;
        // this.FechaDespacho?.setValue(minDespacho)

        // setTimeout(() => {
        //     this.dateDespacho.nativeElement.setAttribute('min', minDespacho)
        //     this.dateDespacho.nativeElement.setAttribute('max', maxDespacho)
        //     this.dateDespacho.nativeElement.setAttribute('value', minDespacho)
            
        // }, 1000);
        
      }


    retryPayment(){
        console.log(this.code, this.metodoPago, this.usuarioId)
        this.shopService.retryPayment(this.code, this.metodoPago, this.usuarioId)
        .subscribe({
          next: (x: any) => {
            if(typeof(x) === 'string'){
                return;
            }else{
                if(this.metodoPago == 'Getnet' || this.metodoPago == 'Mercadopago'){
                    console.log('mercadopago');
                    window.location.href = x.processUrl;
                    
                }else if(this.metodoPago == 'WebPay Plus'){
                    this.token = x.response.token;
                    this.url = x.response.url;
                    this.form.nativeElement.method = "POST";
                    this.input.nativeElement.value = x.response.token;
                    this.input.nativeElement.name = 'token_ws';
                    this.form.nativeElement.appendChild(this.input.nativeElement);
                    this.form.nativeElement.action = x.response.url;
                    this.form.nativeElement.submit();
                    return

                }else{
                    window.location.href = 'https://ulti.cl/#/shop/cart/checkout/success?reference=' + x.ordenId
                }
            }
          },
          error: (err: Error) => console.error('Se produjo un error: ' + err)
        })
    }

    changeMetodo(){
        console.log( this.metodoPago, this.MetodoP?.value)
        this.metodoPago = this.MetodoP?.value;
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


    // get FechaDespacho(){
    //     return this.formFacturacion.get('FechaDespacho');
    // }

    get MetodoP() {
        return this.formMetodoP.get('MetodoP');
    }

}
