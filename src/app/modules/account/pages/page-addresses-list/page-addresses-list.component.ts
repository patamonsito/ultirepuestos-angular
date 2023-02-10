import { Component } from '@angular/core';
import { Direcciones } from '../../../../shared/interfaces/direcciones';
import { SharingService } from 'src/app/core/services/sharing.services';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Regiones } from 'src/app/shared/interfaces/regiones';
import { Validador } from 'src/app/shared/utils/validador.utils';

@Component({
    selector: 'app-page-addresses-list',
    templateUrl: './page-addresses-list.component.html',
    styleUrls: ['./page-addresses-list.component.sass']
})

export class PageAddressesListComponent {
    addresses: Direcciones[] = [];

    Usuario$: Observable<Usuario>;

    agregarDireccion: boolean = false;

    formDirecciones: FormGroup = new FormGroup({});

    comunas: any = [];

    dataRegiones: Regiones[] = [];

    regiones: string[] = [];

    idUsuario: any = '';

    isActualizacion: boolean = false;

    idDireccion: string = '';

    constructor(private shopService: ShopService, private sharingService: SharingService, private router: Router) {
      this.Usuario$ = sharingService.sharingObservable;
    }


    ngOnInit() {
        this.Usuario$.subscribe({
            next: e => { this.addresses = e.Direcciones, this.idUsuario = e.id }
        })

       this.shopService.getRegiones().subscribe({
        next:  e => { this.dataRegiones = e },
        complete: () => { this.dataRegiones.map(e => {
           this.regiones.push(e.Region);
        })}
       });

       this.formInit()
    }

    formInit() {
        this.formDirecciones = new FormGroup({
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
    }

    aniadirDireccionForm(){
        this.isActualizacion = false;
        this.agregarDireccion = true;
    }

    aniadirDireccion(){
        if(this.formDirecciones.invalid){
            this.formDirecciones.markAllAsTouched();
            return;
          }

          let datos: Direcciones = {
            Nombre: this.formDirecciones.get('Nombre')?.value,
            Apellido: this.formDirecciones.get('Apellido')?.value,
            Rut: this.formDirecciones.get('Rut')?.value,
            Telefono: this.formDirecciones.get('Telefono')?.value,
            Region: this.formDirecciones.get('Region')?.value,
            Comuna: this.formDirecciones.get('Comuna')?.value,
            Calle: this.formDirecciones.get('Calle')?.value,
            Numero: this.formDirecciones.get('Numero')?.value,
            Piso: this.formDirecciones.get('Piso')?.value,
            id: this.idUsuario
          }

          datos.Rut =  datos.Rut.replace('-', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').slice(0, -1) + '-' + datos.Rut.slice(-1);

          console.log(datos)

          this.shopService.añadirDireccion(datos)
          .subscribe({
            error: (err: Error) => console.error('Se produjo un error: ' + err),
            complete: () => {
                this.reloadUsuario()
                this.agregarDireccion = false;
                this.formDirecciones.reset();
            },
          })
    }

    editarDireccionForm(data: any){
        this.isActualizacion = true;
        this.formDirecciones.get('Nombre')?.setValue(data.Nombre);
        this.formDirecciones.get('Apellido')?.setValue(data.Apellido);
        this.formDirecciones.get('Rut')?.setValue(data.Rut);
        this.formDirecciones.get('Telefono')?.setValue(data.Telefono);
        this.formDirecciones.get('Region')?.setValue(data.Region);
        let region = this.formDirecciones.get('Region')?.value;
        this.dataRegiones.filter(e => {
            if(e.Region == region){
                this.comunas = e.Comunas
            }
         })
        this.formDirecciones.get('Comuna')?.setValue(data.Comuna);
        this.formDirecciones.get('Calle')?.setValue(data.Calle);
        this.formDirecciones.get('Numero')?.setValue(data.Numero);
        this.formDirecciones.get('Piso')?.setValue(data.Piso);

         this.idDireccion = data._id;

        this.agregarDireccion = true;
    }

    actualizarDireccion(){
        if(this.formDirecciones.invalid){
            this.formDirecciones.markAllAsTouched();
            return;
          }

          let datos: Direcciones = {
            _id: this.idDireccion,
            Nombre: this.formDirecciones.get('Nombre')?.value,
            Apellido: this.formDirecciones.get('Apellido')?.value,
            Rut: this.formDirecciones.get('Rut')?.value,
            Telefono: this.formDirecciones.get('Telefono')?.value,
            Region: this.formDirecciones.get('Region')?.value,
            Comuna: this.formDirecciones.get('Comuna')?.value,
            Calle: this.formDirecciones.get('Calle')?.value,
            Numero: this.formDirecciones.get('Numero')?.value,
            Piso: this.formDirecciones.get('Piso')?.value,
            id: this.idUsuario
          }

          datos.Rut =  datos.Rut.replace('-', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').slice(0, -1) + '-' + datos.Rut.slice(-1);

          console.log(datos)

          this.shopService.actualizarDireccion(datos)
          .subscribe({
            error: (err: Error) => console.error('Se produjo un error: ' + err),
            complete: () => {
                this.reloadUsuario();
                this.agregarDireccion = false;
                this.formDirecciones.reset();
            },
          })


    }

    eliminarDireccion(id: any){
        this.shopService.eliminarDireccion(id).subscribe({
            complete: () => { this.reloadUsuario() }
        });
    }

    reloadUsuario(){
        this.sharingService.reloadUsuario(this.idUsuario);
    }


    verComunas(){
        let region = this.formDirecciones.get('Region')?.value;
        this.dataRegiones.filter(e => {
            if(e.Region == region){
                this.comunas = e.Comunas
            }
         })
    }

    cancelarDireccion(){
        this.agregarDireccion = false;
        this.formDirecciones.reset();
    }

    //Dirreciones
    get nombre() {
        return this.formDirecciones.get('Nombre');
    }
    get apellido() {
        return this.formDirecciones.get('Apellido');
    }
    get rut() {
        return this.formDirecciones.get('Rut');
    }
    get telefono() {
        return this.formDirecciones.get('Telefono');
    }
    get region() {
        return this.formDirecciones.get('Region');
    }
    get comuna() {
        return this.formDirecciones.get('Comuna');
    }
    get calle() {
        return this.formDirecciones.get('Calle');
    }
    get numero() {
        return this.formDirecciones.get('Numero');
    }
    get piso() {
        return this.formDirecciones.get('Piso');
    }
}
