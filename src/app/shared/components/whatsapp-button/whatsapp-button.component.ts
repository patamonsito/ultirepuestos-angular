import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss'],
  animations: [
    trigger('fadeInOutAnimation', [
      transition(':enter', [   // :enter se utiliza para definir estilos/animaciones al ingresar el elemento
        style({opacity: 0}),
        animate('1s', style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave para definir estilos/animaciones al salir el elemento
        animate('1s', style({opacity: 0}))
      ])
    ])
  ]
})

export class WhatsappButtonComponent implements OnInit {
  showMessage: boolean = false;
  public particles: number[] = Array(5).fill(0);  // Aquí estamos creando 5 partículas.

  ngOnInit(): void {
    setTimeout(() => {
      this.showMessage = true;
    }, 10000);  // 10 segundos
  }
}
