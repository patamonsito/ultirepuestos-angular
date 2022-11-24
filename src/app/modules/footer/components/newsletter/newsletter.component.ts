import { Component, TemplateRef   } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShopService } from 'src/app/shared/api/shop.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-footer-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {


    mensajeCorreo: any;

    suscripcionForm = new FormGroup({
        correo: new FormControl('', [Validators.email, Validators.required, Validators.minLength(1)])
      });

    constructor(private shopService: ShopService,
        private modalService: BsModalService, public modalRef: BsModalRef) { }


    suscribirCorreo(template: TemplateRef<any>): void{

        console.log(this.suscripcionForm.status)

        if(this.suscripcionForm.status == 'INVALID'){
            return;
        }


          let correo = this.suscripcionForm.value.correo

          this.shopService.suscribirCorreo(correo).subscribe({
            next: (res: any) => {
                this.mensajeCorreo = res.message;
                this.modalRef = this.modalService.show(template);
                this.suscripcionForm.value.correo = '';
                return;
            },
            error: (e) => console.error(e)
        })

    }

    get correo() {
      return this.suscripcionForm.get('correo');
    }
}
