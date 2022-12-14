import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[AppFormatLetras]'
})
export class AppFormatLetras{

    @HostListener('keyup') onMouseEnter() {
        var text = this.element.nativeElement.value;
        if (text) {
          let textFormato = text.replaceAll(/[`0-9~!@¬€^´#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
          this.element.nativeElement.value = textFormato;
        }
      }

  constructor(
    private element: ElementRef
  ) {

  }
}
