import { Component, EventEmitter, Output } from '@angular/core';
import { SharingService } from 'src/app/core/services/sharing.services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    Usuario$: Observable<Usuario>;

    formLogin: FormGroup = new FormGroup({});

    loginError: string = '';

    constructor(
        private sharingService: SharingService,
        private router: Router
    ) {
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
            this.loginError = '';
            if(e.Nombre != ''){
              this.router.navigate(['/'])
            }else{
              this.loginError = 'Error al iniciar sesion, Verifique Correo y Contraseña.';
            }
          }
        })
      }

      cerrarSesion(){
          this.closeMenu.emit()
          this.sharingService.cerrarSesion();
          this.loginError = '';
      }

    //Login
    get correoLogin() {
        return this.formLogin.get('Correo');
      }
    
    get contraseniaLogin() {
      return this.formLogin.get('Contraseña');
    }

}
