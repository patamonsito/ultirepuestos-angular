import { Component } from '@angular/core';
import { SharingService } from 'src/app/core/services/sharing.services';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent {

    Usuario$: Observable<Usuario>;
    formPerfil: FormGroup;
    allowedExtensions = ['csv', 'xls'];
    mensaje = '';
    datosActualizado: boolean = false;
    Correo: string = '';
    Avatar: string = '';
    fileToUpload: any;
    id: any;

    constructor(private shopService: ShopService, private sharingService: SharingService, private router: Router, private route: ActivatedRoute) {
      this.Usuario$ = sharingService.sharingObservable;

      this.formPerfil = new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        img: new FormControl('', []),
      })

      this.Usuario$.subscribe({
        next: e => {
          
            if(!e){
              this.router.navigate(['../../'], {relativeTo: this.route}).then();
            }
            this.id = e.id;
            this.editarDireccionForm(e);
        }
      })

    }


    editarDireccionForm(data: any){
        this.formPerfil.get('nombre')?.setValue(data.Nombre);
        this.formPerfil.get('apellido')?.setValue(data.Apellido);
        this.formPerfil.get('correo')?.setValue(data.Correo);
        this.Avatar = data.Avatar
    }


    ngOnInit() {

    }

    onImageChangeFromFile($event:any){
        if ($event.target.files && $event.target.files[0]) {
            let file = $event.target.files[0];
            console.log(file);
            if(file.type == "image/jpeg" && file.size <= 1024000 || file.type == "image/png" && file.size <= 1024000) {
              console.log("correct");
              this.fileToUpload = $event.target.files[0];
            }
            else {
              //call validation
              this.fileToUpload = null;
              this.formPerfil.get('correo')?.setValue('');
              alert('Su imagen debe pesar menos de 1 MB y debe estar en formato JPG o PNG')
            }
        }
    }

    actualizarUsuario(){

          let old_avatar = this.Avatar == 'default_avatar.png' ? this.id : this.Avatar;

          const formData: FormData = new FormData();
          formData.append('id', this.id);
          formData.append('Nombre', this.nombre?.value);
          formData.append('Apellido', this.apellido?.value);
          formData.append('Correo', this.correo?.value);
          formData.append('Old_avatar', old_avatar);
          console.log(this.fileToUpload)
          if(this.fileToUpload){
              formData.append('Avatar', this.fileToUpload, this.id);
          }

          this.shopService.actualizarUsuario(formData, this.id)
          .subscribe({
            next: (x: any) => {
                  if(x.message){
                      this.mensaje = x.message
                  }else{
                      this.datosActualizado = true
                      this.reloadUsuario()
                  }
            },
            error: (err: Error) => console.error('Se produjo un error: ' + err),
            complete: () => {},
          })

    }

    reloadUsuario(){
        this.sharingService.reloadUsuario(this.id);
    }

    get nombre() {
      return this.formPerfil.get('nombre');
    }

    get apellido() {
      return this.formPerfil.get('apellido');
    }

    get correo() {
      return this.formPerfil.get('correo');
    }

    get img() {
      return this.formPerfil.get('img');
    }

}
