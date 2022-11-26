import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[AppFormatTelefono]'
})
export class AppFormatTelefono{

    @HostListener('keyup') onMouseEnter() {
        var text = this.element.nativeElement.value;
        console.log(text)
        if (text) {
          let textFormato = text.replaceAll(/[`a-zA-ZñÑá-úÁ-Ú~!@¬€^´#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
          console.log(textFormato)
          this.element.nativeElement.value = textFormato;
        }
      }

  constructor(
    private element: ElementRef
  ) {

  }
}
