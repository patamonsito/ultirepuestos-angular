import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { Validador } from 'src/app/shared/utils/validador.utils'
import { SharingService } from 'src/app/core/services/sharing.services';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit{

    formLogin: FormGroup = new FormGroup({});

    formRegistro: FormGroup = new FormGroup({});

    register: boolean = false;

    reContraseniaValid: boolean = false;

    Usuario$: Observable<Usuario>;

    constructor(private shopService: ShopService, private sharingService: SharingService) { 
      this.Usuario$ = sharingService.sharingObservable;
    }

    ngOnInit() {
        this.formInit();
    }

    formInit(){
      this.formLogin = new FormGroup({
        Correo: new FormControl('', [Validators.required, Validators.email]),
        Contraseña: new FormControl('', [Validators.required]),
      });
  
      this.formRegistro = new FormGroup({
        Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
        Apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
        Rut: new FormControl('', [Validators.required, Validador.validarRUT ]),
        Correo: new FormControl('', [Validators.required, Validators.email]),
        Telefono: new FormControl('+56', [Validators.required, Validators.minLength(12)]),
        Contraseña: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
        ReContraseña: new FormControl('', [Validators.required])
      })

    }


    verificarUsuario(){
      let email = this.formLogin.get("Correo")?.value;
      let contraseña = this.formLogin.get("Contraseña")?.value; 
      this.sharingService.iniciarSesion(email, contraseña)
    }

    crearUsuario(){

      if(this.formRegistro.invalid){
        this.formRegistro.markAllAsTouched();
        return;
      }else if(this.formRegistro.get('Contraseña')?.value != this.formRegistro.get('ReContraseña')?.value){
        this.reContraseniaValid = this.formRegistro.get('Contraseña')?.value == this.formRegistro.get('ReContraseña')?.value ? false : true;
        return;
      }
      
      let datos: Usuario = {
        Nombre: this.formRegistro.get('Nombre')?.value,
        Apellido: this.formRegistro.get('Apellido')?.value,
        Rut: this.formRegistro.get('Rut')?.value,
        Correo: this.formRegistro.get('Correo')?.value,
        Telefono: this.formRegistro.get('Telefono')?.value,
        Contraseña: this.formRegistro.get('Contraseña')?.value
      }

      datos.Rut =  datos.Rut.replace('-', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').slice(0, -1) + '-' + datos.Rut.slice(-1);

      this.shopService.registrarUsuario(datos)
      .subscribe({
        next: (x) => console.log('Respuesta del servidor: ' + x),
        error: (err: Error) => console.error('Se produjo un error: ' + err),
        complete: () => console.log('Siguiente operacion :3'),
      })
    }


    validarReContrasnia(){
      if(this.formRegistro.get('ReContraseña')?.value){
        this.reContraseniaValid = this.formRegistro.get('Contraseña')?.value == this.formRegistro.get('ReContraseña')?.value ? false : true;
      }
    }


    //Registro
    get nombre() {
      return this.formRegistro.get('Nombre');
    }
    get apellido() {
      return this.formRegistro.get('Apellido');
    }
    get rut() {
      return this.formRegistro.get('Rut');
    }
    get correo() {
      return this.formRegistro.get('Correo');
    }

    get telefono() {
      return this.formRegistro.get('Telefono');
    }

    get contrasenia() {
      return this.formRegistro.get('Contraseña');
    }
    get reContrasenia() {
      return this.formRegistro.get('ReContraseña');
    }

    //Login
    get correoLogin() {
      return this.formLogin.get('Correo');
    }
  
    get contraseniaLogin() {
      return this.formLogin.get('Contraseña');
    }

  }