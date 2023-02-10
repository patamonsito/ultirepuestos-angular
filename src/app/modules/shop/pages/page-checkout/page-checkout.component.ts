import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../../../../shared/services/root.service';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { Validador } from 'src/app/shared/utils/validador.utils'
import { SharingService } from 'src/app/core/services/sharing.services';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Facturacion } from 'src/app/shared/interfaces/facturacion';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Regiones } from 'src/app/shared/interfaces/regiones';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    Usuario$: Observable<Usuario>;
    documentos = ['Boleta', 'Factura'];
    formFacturacion: FormGroup;
    formAgencia: FormGroup;
    formDireccion: FormGroup;
    formPago: FormGroup;
    formObservacion: FormGroup;
    dataRegiones: Regiones[] = [];
    regiones: Regiones[] = [];
    entregas: string[] = ['Envio a Region', 'Retiro en sucursal', 'Delivery Region Metropolitana'];
    dataEntrega: any;
    idDireccion = '';
    comunas: any;
    addresses: any;
    idUsuario: any;
    reContraseniaValid: boolean = false;
    nuevoUsuario: boolean = false;
    isPersona: boolean = false;

    constructor(
        public root: RootService,
        public cart: CartService,
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService,
        private cookie: CookieService,
        private sharingService: SharingService
    ) {
        this.Usuario$ = sharingService.sharingObservable;

        this.formFacturacion = new FormGroup({
            Rut: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
            RazonSocial: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
            Correo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
            Entrega: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
            Contraseña: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            ReContraseña: new FormControl('', [Validators.required])
        });

        this.formAgencia = new FormGroup({
            Agencia: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
        })

        this.formDireccion = new FormGroup({
            Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
            Apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
            Rut: new FormControl('', [Validators.required, Validador.validarRUT ]),
            Telefono: new FormControl('+56', [Validators.required, Validators.minLength(12)]),
            Region: new FormControl(null, [Validators.required]),
            Comuna: new FormControl(null, [Validators.required]),
            Calle: new FormControl('', [Validators.required]),
            Numero: new FormControl('', [Validators.required]),
            Piso: new FormControl('', [])
        });

        this.formObservacion = new FormGroup({
            Observaciones: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ])
        })


        this.formPago = new FormGroup({
            MetodoPago: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
        });


    }

    validateRut(){

        let numberRut = this.Rut?.value ? Number(this.Rut?.value.replaceAll('.', '').replaceAll('-', '')) : 0;

        console.log(numberRut);

        if(numberRut && numberRut.toString().length == 8 && numberRut < 50000000){
            this.isPersona = true;
        }else{
            this.isPersona = false;
        }
    }


    ngOnInit(): void {

        this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
            if (!quantity) {
                this.router.navigate(['../cart'], {relativeTo: this.route}).then();
            }
        });

        this.shopService.getRegiones().subscribe({
            next:  e => { this.dataRegiones = e },
            complete: () => { this.dataRegiones.map((e: any) => {
               this.regiones.push(e.Region);
            })}
           });



        this.shopService.getRegiones().subscribe({
            next:  e => { this.dataRegiones = e },
            complete: () => {
            this.dataRegiones.map(e => {
               this.Usuario$.subscribe({
                next: e => { this.addresses = e.Direcciones, this.idUsuario = e.id;
                let data = e.Direcciones.filter((e: any) => {
                    if(e.Default == true){
                        return e;
                    }
                })[0];

                console.log(data);


                this.editarDireccionForm(data)
                }
            })
            })}
           });

        this.Usuario$.subscribe(e => {
            let data = e.Direcciones.filter((e: any) => {
                if(e.Default == true){
                    return e;
                }
            })[0];

            this.editarDireccionForm(data)
        })
    }



    editarDireccionForm(data: any){
        this.NombreD?.setValue(data.Nombre || this.cookie.get('NombreD') || '');
        this.ApellidoD?.setValue(data.Apellido || this.cookie.get('ApellidoD') || '');
        this.RutD?.setValue(data.Rut || this.cookie.get('RutD') || '');
        this.TelefonoD?.setValue(data.Telefono || this.cookie.get('TelefonoD') || '');
        this.Region?.setValue(data.Region || this.cookie.get('Region') || '');
        let region = this.Region?.value;
        this.dataRegiones.filter((e: any) => {
            if(e.Region == region){
                this.comunas = e.Comunas
            }
         })


         this.Comuna?.setValue(data.Comuna || this.cookie.get('Comuna') || '');
         this.Calle?.setValue(data.Calle || this.cookie.get('Calle') || '');
         this.Numero?.setValue(data.Numero || this.cookie.get('Numero') || '');
         this.Piso?.setValue(data.Piso || this.cookie.get('Piso') || '');

         this.idDireccion = data._id || '';
    }



    verComunas(){
        let region = this.formDireccion.get('Region')?.value;
        this.dataRegiones.filter(e => {
            if(e.Region == region){
                this.comunas = e.Comunas
            }
         })
    }

    validarReContrasnia(){
        if(this.ReContrasenia?.value){
          this.reContraseniaValid = this.ReContrasenia?.value == this.Contrasenia?.value ? false : true;
        }
      }


    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }


    get TipoDocumento() {
        return this.formFacturacion.get('TipoDocumento');
    }
    get Rut() {
        return this.formFacturacion.get('Rut');
    }
    get RazonSocial() {
        return this.formFacturacion.get('RazonSocial');
    }
    get Correo() {
        return this.formFacturacion.get('Correo');
    }
    get Entrega() {
        return this.formFacturacion.get('Entrega');
    }
    get Nombre() {
        return this.formFacturacion.get('Nombre');
    }
    get Apellido() {
        return this.formFacturacion.get('Apellido');
    }
    get FormaEntrega() {
        return this.formFacturacion.get('FormaEntrega');
    }
    get Agencia() {
        return this.formAgencia.get('Agencia');
    }
    get esOficina() {
        return this.formFacturacion.get('esOficina');
    }
    get MetodoPago() {
        return this.formPago.get('MetodoPago');
    }
    get Observaciones() {
        return this.formFacturacion.get('Observaciones');
    }
    get Contrasenia() {
        return this.formFacturacion.get('Contraseña');
    }

    get ReContrasenia() {
        return this.formFacturacion.get('ReContraseña');
    }

    // form Direccion
    get NombreD() {
        return this.formDireccion.get('Nombre');
    }
    get ApellidoD() {
        return this.formDireccion.get('Apellido');
    }
    get RutD() {
        return this.formDireccion.get('Rut');
    }
    get TelefonoD() {
        return this.formDireccion.get('Telefono');
    }
    get Region() {
        return this.formDireccion.get('Region');
    }
    get Comuna() {
        return this.formDireccion.get('Comuna');
    }
    get Calle() {
        return this.formDireccion.get('Calle');
    }
    get Numero() {
        return this.formDireccion.get('Numero');
    }
    get Piso() {
        return this.formDireccion.get('Piso');
    }



}
