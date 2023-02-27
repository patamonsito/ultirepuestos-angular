import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { Validador } from 'src/app/shared/utils/validador.utils'
import { SharingService } from 'src/app/core/services/sharing.services';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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

    loginError: string = '';

    logger: boolean = false;

    mensaje: string = '';
    
    registed: boolean = false;

    Usuario$: Observable<Usuario>;

    constructor(private shopService: ShopService,
         private sharingService: SharingService,
         private router: Router,
         private route: ActivatedRoute) {
      this.Usuario$ = sharingService.sharingObservable;
      this.logger = this.sharingService.logger;
    }

    ngOnInit() {
        this.Usuario$.subscribe({
            next: (e) => {
                if(e.Rut){
                    this.router.navigate(['../../'], {relativeTo: this.route}).then();
                }
            }
        })
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
        Contraseña: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
        ReContraseña: new FormControl('', [Validators.required])
      })

    }


    verificarUsuario(){
      if(this.formLogin.invalid){
        this.formLogin.markAllAsTouched();
        return;
      }
      let email = this.formLogin.get("Correo")?.value;
      let contraseña = this.formLogin.get("Contraseña")?.value;
      this.sharingService.iniciarSesion(email, contraseña)
      this.Usuario$.subscribe({
        next: e => {
            console.log(e.Nombre, this.logger, 'logger1')
          if(e.Nombre != '' && this.logger == false){
            this.logger = this.sharingService.logger;
            this.loginError = '';
            this.router.navigate(['../../'], {relativeTo: this.route}).then();
          }else{
            this.loginError = 'Error al iniciar sesion, Verifique Correo y Contraseña.';
          }
        }
      })
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
      .subscribe((x: any) => {
        console.log(x)
          if(x.message.includes('Rut_1')){
            return this.mensaje = 'El rut ingresado ya se encuentra registrado.'
          }else if(x.message.includes('Correo_1')){
            return this.mensaje = 'El correo ingresado ya se encuentra registrado.';
          }else{
            this.registed = true;
            return setTimeout(() => {
              window.location.href = '/'
            }, 3000);
          }
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
