import { Component } from '@angular/core';
import { SharingService } from 'src/app/core/services/sharing.services';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-page-password',
    templateUrl: './page-password.component.html',
    styleUrls: ['./page-password.component.sass']
})
export class PagePasswordComponent {

    Usuario$: Observable<Usuario>;
    formContrasenia: FormGroup = new FormGroup({});
    reContraseniaValid: boolean = false;
    correo: string = '';
    mensaje: string = '';
    contraseniaCambiada: boolean = false;
    Modal: boolean = false;

    constructor(private shopService: ShopService, private sharingService: SharingService, private router: Router, private route: ActivatedRoute) {
      this.Usuario$ = sharingService.sharingObservable;
    }

    ngOnInit() {

      this.Usuario$.subscribe(e => { 
        if(!e){
          this.router.navigate(['../../'], {relativeTo: this.route}).then();
      }
      })
        this.formContrasenia = new FormGroup({
            contrasenia: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            newContrasenia: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            reContrasenia: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
          })

    }



      validarReContrasnia(){
        console.log(this.reContrasenia?.value);
        if(this.reContrasenia?.value != ''){
          this.reContraseniaValid = this.newContrasenia?.value == this.reContrasenia?.value ? false : true;
        }
      }


      cambiarContrasenia(){
        if(this.formContrasenia.invalid){
          this.formContrasenia.markAllAsTouched();
          return;
        }else if(this.newContrasenia?.value != this.reContrasenia?.value){
          this.reContraseniaValid = this.newContrasenia?.value == this.reContrasenia?.value ? false : true;
          return;
        }

        this.Usuario$.subscribe({
            next: e => {
                this.correo = e.Correo
            }
          })


        let datos: any = {
          contrasenia: this.contrasenia?.value,
          newContrasenia: this.newContrasenia?.value,
          reContrasenia: this.reContrasenia?.value,
          correo: this.correo
        }

        this.shopService.changePassword(datos)
        .subscribe({
          next: (x: any) => {
                if(x.message){
                    this.mensaje = x.message
                }else{
                    this.Modal = true
                }
          },
          error: (err: Error) => console.error('Se produjo un error: ' + err),
          complete: () => {},
        })
      }


      get contrasenia() {
        return this.formContrasenia.get('contrasenia');
      }

      get newContrasenia() {
        return this.formContrasenia.get('newContrasenia');
      }


      get reContrasenia() {
        return this.formContrasenia.get('reContrasenia');
      }


}
