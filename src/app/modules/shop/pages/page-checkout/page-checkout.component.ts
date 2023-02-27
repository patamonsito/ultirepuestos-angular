import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss']
})



export class PageCheckoutComponent implements OnInit, OnDestroy {

    @ViewChild('dateDespacho') dateDespacho: ElementRef;
    @ViewChild('f') form: ElementRef;
    @ViewChild('i') input: ElementRef;

    private destroy$: Subject<void> = new Subject();
    Usuario$: Observable<Usuario>;
    Documentos = ['Boleta', 'Factura'];
    formFacturacion: FormGroup;
    formAgencia: FormGroup;
    formDireccion: FormGroup;
    formPago: FormGroup;
    formObservacion: FormGroup;
    dataRegiones: Regiones[] = [];
    regiones: Regiones[] = [];
    entregas: string[] = ['Envio a región', 'Delivery Región Metropolitana', 'Retiro en bodega'];
    agencias: string[] = ['Chilexpress', 'Starken', 'Pullman'];
    dataEntrega: any;
    paimentMethod: any = [
        {
        _id: 1,
        name: 'Getnet',
        description: 'Paga seguro todo lo que necesitas con Webpay Plus utilizando tus tarjetas de crédito, débito y prepago, de todos los emisores nacionales e internacionales.',
        permission: [null, '', 'Envio a región', 'Delivery Región Metropolitana', 'Retiro en bodega'],
        img: '',
        active: true
    },
    {
        _id: 2,
        name: 'WebPay Plus',
        description: 'Paga seguro todo lo que necesitas con Webpay Plus utilizando tus tarjetas de crédito, débito y prepago, de todos los emisores nacionales e internacionales.',
        permission: [null, '', 'Envio a región', 'Delivery Región Metropolitana', 'Retiro en bodega'],
        img: 'http://147.182.141.213:3000/etc/webpay-plus-full.png',
        active: false
    },
    {
        _id: 3,
        name: 'Transferencia Bancaria',
        description: 'Realiza una transferencia electrónica a nuestra cuenta bancaria Ulti SPA 77612907-0.',
        permission: [null, '', 'Envio a región', 'Delivery Región Metropolitana', 'Retiro en bodega'],
        img: 'http://147.182.141.213:3000/etc/santander-logo.png',
        active: false
    },
    // {
    //     _id: 4,
    //     name: 'Pago Presencial',
    //     description: 'Paga presencialmente en nuestra bodega una vez su producto se encuentre listo para ser entregado.',
    //     permission: ['Retiro en bodega'],
    //     img: '',
    //     active: false
    // },
    // {
    //     _id: 5,
    //     name: 'Pagar al recibir',
    //     description: 'Paga cuando recibas el producto en tu domicilio en Santiago.',
    //     permission: ['Delivery Región Metropolitana'],
    //     img: '',
    //     active: false
    // }
]
    paimentSelected: any = null;
    idDireccion = '';
    comunas: any;
    addresses: any;
    idUsuario: any;
    reContraseniaValid: boolean = false;
    nuevoUsuario: boolean = false;
    isPersona: boolean = false;
    checkoutTerms: boolean = true;
    checkoutTermsError: any;
    isApiError = false;
    apiErrorMsg = '';
    minDespacho = null;
    maxDespacho = null;
    token = '';
    url = ''

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
            Documento: new FormControl('Boleta', [Validators.required]),
            Rut: new FormControl('27218434-8', [Validators.required, Validador.validarRUT ]),
            Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]),
            Apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]),
            RazonSocial: new FormControl('Luis Sanchez', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]),
            Giro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]),
            DireccionEmpresa:  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(130) ]),
            Correo: new FormControl('luisdavid.uni@hotmail.com', [Validators.required, Validators.email ]),
            FechaDespacho: new FormControl( null, [Validators.required ]),
            Entrega: new FormControl('Retiro en Bodega', [Validators.required ]),
            Telefono: new FormControl('+56', [Validators.required, Validators.minLength(12)]),
            Contraseña: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            ReContraseña: new FormControl('', [Validators.required])
        });

        this.formAgencia = new FormGroup({
            Agencia: new FormControl(null, [Validators.required]),
        })

        this.formDireccion = new FormGroup({
            NombreD: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30) ]),
            Rut: new FormControl('', [Validators.required, Validador.validarRUT ]),
            Region: new FormControl(null, [Validators.required]),
            Comuna: new FormControl(null, [Validators.required]),
            Calle: new FormControl('', [Validators.required]),
            Numero: new FormControl('', [Validators.required]),
            Departamento: new FormControl('', [])
        });

        this.formObservacion = new FormGroup({
            Observaciones: new FormControl('', [Validators.minLength(3), Validators.maxLength(500)])
        })


        this.formPago = new FormGroup({
            MetodoPago: new FormControl('Getnet', [Validators.required]),
        });


    }

    ngAfterViewInit() {
        //get your element here
        let today = new Date();
        let minDespacho: any;
        let maxDespacho: any;
        let saveMinDespacho: any;
        if(today.getDay() == 5){
            minDespacho = new Date(today.setDate(today.getDate() + 4)).toISOString().split('T')[0];
            saveMinDespacho = new Date(minDespacho)
        }else if(today.getDay() == 6){
            minDespacho = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];
            saveMinDespacho = new Date(minDespacho)
        }else{
            minDespacho = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
            saveMinDespacho = new Date(minDespacho)
        }

        // Maxima fecha
        if(saveMinDespacho.getDay() == 1){
            maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 3)).toISOString().split('T')[0];
        }else if(saveMinDespacho.getDay() == 2){
            maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 2)).toISOString().split('T')[0];
        }else if(saveMinDespacho.getDay() == 3){
            maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 1)).toISOString().split('T')[0];
        }else{
            maxDespacho = new Date(saveMinDespacho.setDate(saveMinDespacho.getDate() + 4)).toISOString().split('T')[0];
        }
        this.minDespacho = minDespacho;
        this.maxDespacho = maxDespacho;
        this.FechaDespacho?.setValue(minDespacho)
        this.dateDespacho.nativeElement.setAttribute('min', minDespacho)
        this.dateDespacho.nativeElement.setAttribute('max', maxDespacho)
        this.dateDespacho.nativeElement.setAttribute('value', minDespacho)
        
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

    openDatepicker(){
        this.dateDespacho.nativeElement.showPicker()
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

                }
            })
            })}
           });
    }
    
    setDelivery(){
        this.dataEntrega =  this.Entrega?.value;

        if(this.dataEntrega != 'Retiro en bodega'){
            this.Usuario$.subscribe(e => {
                let data = e.Direcciones.filter((e: any) => {
                    if(e.Default == true){
                        return e;
                    }
                })[0];
                this.editarDireccionForm(data)
            });
        }

        if(this.dataEntrega == 'Delivery Región Metropolitana'){
            this.Region?.setValue('Metropolitana de Santiago');
            let region = this.Region?.value;
            this.dataRegiones.filter((e: any) => {
                if(e.Region == region){
                    this.comunas = e.Comunas
                }
             })
        }else{
            this.Region?.setValue(null);
            this.Comuna?.setValue(null);
            this.Contrasenia?.setValue('');
            this.ReContrasenia?.setValue('');
            this.Agencia?.setValue('');
            this.NombreD?.setValue('');
            this.RutD?.setValue('');
            this.Region?.setValue('');
            this.Comuna?.setValue('');
            this.Calle?.setValue('');
            this.Numero?.setValue('');
            this.comunas = [];
        }


    }



    editarDireccionForm(data: any){
        this.NombreD?.setValue(data?.Nombre || this.cookie.get('NombreD') || '');
        this.RutD?.setValue(data?.Rut || this.cookie.get('RutD') || '');
        this.Telefono?.setValue(data?.Telefono || this.cookie.get('Telefono') || '');
        this.Region?.setValue(data?.Region || this.cookie.get('Region') || null);
        let region = this.Region?.value;
        this.dataRegiones.filter((e: any) => {
            if(e.Region == region){
                this.comunas = e.Comunas
            }
         })


         this.Comuna?.setValue(data?.Comuna || this.cookie.get('Comuna') || null);
         this.Calle?.setValue(data?.Calle || this.cookie.get('Calle') || '');
         this.Numero?.setValue(data?.Numero || this.cookie.get('Numero') || '');
         this.Departamento?.setValue(data?.Departamento || this.cookie.get('Departamento') || '');

         this.idDireccion = data?._id || '';
    }



    verComunas(){
        let region = this.formDireccion.get('Region')?.value;
        this.dataRegiones.filter(e => {
            if(e.Region == region){
                this.comunas = e.Comunas
            }
         })
    }

    changeActivePaiment(id: any){
        let result = this.paimentMethod.filter((e: any) => {
            if(e._id == id){
                return e;
            }
        })[0]

        this.paimentSelected = result;
        this.MetodoPago?.setValue(result)
        this.paimentMethod = this.paimentMethod.map((e: any) => {
            if(e._id == id){
                e.active = true;
                return e;
            }else{
                e.active = false;
                return e;
            }
        })
    }

    purchase(){


        // this.Contrasenia?.setValue('Ninguna');
        // this.ReContrasenia?.setValue('Ninguna');
        // this.Agencia?.setValue('Ninguna');
        // this.NombreD?.setValue('Ninguna');
        // this.RutD?.setValue('1.111.111-7');
        // this.Region?.setValue('Ninguna');
        // this.Comuna?.setValue('Ninguna');
        // this.Calle?.setValue('Ninguna');
        // this.Nombre?.setValue('Luis');
        // this.Telefono?.setValue('+56941054479');
        // this.Apellido?.setValue('Sanchez');
        // this.Numero?.setValue('Ninguna');
        // entregas: string[] = ['Envio a región', 'Delivery Región Metropolitana', 'Retiro en bodega'];

        if(!this.nuevoUsuario){
            this.Contrasenia?.setValue('undefined')
            this.ReContrasenia?.setValue('undefined')
        }

        if(this.Documento?.value == 'Boleta'){
            this.RazonSocial?.setValue('ninguno')
            this.Giro?.setValue('ninguno')
            this.DireccionEmpresa?.setValue('ninguno')
        }

        if(this.Documento?.value == 'Factura'){
            this.Nombre?.setValue('ninguno')
            this.Apellido?.setValue('ninguno')
        }


        if(this.Entrega?.value == 'Retiro en bodega'){
            this.Contrasenia?.setValue('Ninguna');
            this.ReContrasenia?.setValue('Ninguna');
            this.Agencia?.setValue('Ninguna');
            this.NombreD?.setValue('Ninguna');
            this.RutD?.setValue('1.111.111-7');
            this.Region?.setValue('Ninguna');
            this.Comuna?.setValue('Ninguna');
            this.Calle?.setValue('Ninguna');
            this.Numero?.setValue('Ninguna');
        }

        if(this.Entrega?.value == 'Delivery Región Metropolitana'){
            this.Agencia?.setValue('Ninguna');
        }


        if(this.formFacturacion.invalid){
            console.log(this.formFacturacion, 'this.formFacturacion invalido')
          this.formFacturacion.markAllAsTouched();
          return;
        }
        
        if(this.formFacturacion.get('Contraseña')?.value != this.formFacturacion.get('ReContraseña')?.value && this.isPersona == true && this.nuevoUsuario == true){
          this.reContraseniaValid = this.formFacturacion.get('Contraseña')?.value == this.formFacturacion.get('ReContraseña')?.value ? false : true;
          return;
        }
        
        if(this.formDireccion.invalid && this.Entrega?.value == 'Envio a región' || this.formDireccion.invalid && this.Entrega?.value == 'Delivery Región Metropolitana'){
            console.log(this.formDireccion, 'this.formDireccion invalido')
            this.formDireccion.markAllAsTouched(); 
            return;
        }
        
        if(this.formAgencia.invalid && this.Entrega?.value == 'Envio a región'){
            console.log(this.formAgencia, 'this.formAgencia invalido')
            this.formAgencia.markAllAsTouched();   
            return;
        }

        
        if(this.formPago.invalid){
            console.log(this.formPago, 'this.formPago invalido')
            this.formPago.markAllAsTouched(); 
            return;
        }

        if(this.checkoutTerms == false){
            this.checkoutTermsError = true;
            return;
        }

        let carro: any = localStorage.getItem('cartItems')


        let datos: any = {
            Nombre: this.Nombre?.value,
            Apellido: this.Apellido?.value,
            Telefono: this.Telefono?.value,
            FechaDespacho: this.FechaDespacho?.value,
            DireccionEmpresa: this.DireccionEmpresa?.value,
            Giro: this.Giro?.value,
            Documento: this.Documento?.value,
            Rut: this.Rut?.value,
            RazonSocial: this.RazonSocial?.value,
            Correo: this.Correo?.value,
            Entrega: this.Entrega?.value,
            Contraseña: this.Contrasenia?.value,
            ReContraseña: this.ReContrasenia?.value,
            Agencia: this.Agencia?.value,
            NombreD: this.NombreD?.value,
            RutD: this.RutD?.value,
            Region: this.Region?.value,
            Comuna: this.Comuna?.value,
            Calle: this.Calle?.value,
            Numero: this.Numero?.value,
            Departamento: this.Departamento?.value,
            Observaciones: this.Observaciones?.value,
            MetodoPago: this.MetodoPago?.value.name,
            NuevoUsuario: this.nuevoUsuario,
            Token: this.idUsuario,
            Items: JSON.parse(carro)
        }


        datos.Rut =  datos.Rut.replace('-', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').slice(0, -1) + '-' + datos.Rut.slice(-1);
        datos.RutD =  datos.RutD.replace('-', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').slice(0, -1) + '-' + datos.Rut.slice(-1);


        this.shopService.generarOrdenCompra(datos)
        .subscribe({
          next: (x: any) => {
            if(typeof(x) === 'string'){
                this.isApiError = true;
                this.apiErrorMsg = x;
            }else{
                if(this.MetodoPago?.value.name == 'Getnet'){
                    
                    window.location.href = x.processUrl;
                    
                }else if(this.MetodoPago?.value.name == 'WebPay Plus'){
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
                    this.router.navigate(['../seguimiento/' + x.ordenId ], {relativeTo: this.route}).then()
                }
            }
          },
          error: (err: Error) => console.error('Se produjo un error: ' + err)
        })

  
        // let datos: Usuario = {
        //   Nombre: this.formRegistro.get('Nombre')?.value,
        //   Apellido: this.formRegistro.get('Apellido')?.value,
        //   Rut: this.formRegistro.get('Rut')?.value,
        //   Correo: this.formRegistro.get('Correo')?.value,
        //   Telefono: this.formRegistro.get('Telefono')?.value,
        //   Contraseña: this.formRegistro.get('Contraseña')?.value
        // }
  
        // datos.Rut =  datos.Rut.replace('-', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').slice(0, -1) + '-' + datos.Rut.slice(-1);
  
        // this.shopService.registrarUsuario(datos)
        // .subscribe({
        //   next: (x) => console.log('Respuesta del servidor: ' + x),
        //   error: (err: Error) => console.error('Se produjo un error: ' + err),
        //   complete: () => console.log('Siguiente operacion :3'),
        // })

    }

    goWebpay(form: any, e: any): void {  
            console.log(form)
           e.target.submit();
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


    get FechaDespacho(){
        return this.formFacturacion.get('FechaDespacho');
    }
    
    get DireccionEmpresa(){
        return this.formFacturacion.get('DireccionEmpresa');
    }

    get Giro() {
        return this.formFacturacion.get('Giro');
    }

    get Documento() {
        return this.formFacturacion.get('Documento');
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
        return this.formObservacion.get('Observaciones');
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
    get RutD() {
        return this.formDireccion.get('Rut');
    }
    get Telefono() {
        return this.formFacturacion.get('Telefono');
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
    get Departamento() {
        return this.formDireccion.get('Departamento');
    }

}
