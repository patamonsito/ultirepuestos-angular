import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[AppFormatRut]'
})
export class AppFormatRut{

    @HostListener('keyup') onMouseEnter() {
        if(!this.element.nativeElement.value){
            return;
        }
        var actual = this.element.nativeElement.value.replace(/^0+/, "");
        actual = actual.replace(/-/, "");
        actual = actual.replace(/\s/g, "");
        if (actual != "" && actual.length > 1) {
          var sinPuntos = actual.replace(/\./g, "");
          var actualLimpio = sinPuntos.replace(/-/g, "");
          var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
          var rutPuntos = "";
          var i = 0;
          var j = 1;
          for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
              rutPuntos = "." + rutPuntos;
            }
            j++;
          }
          var dv = actualLimpio.substring(actualLimpio.length - 1);
          rutPuntos = rutPuntos + "-" + dv;
          this.element.nativeElement.value = rutPuntos;
        }
      }

  constructor(
    private element: ElementRef
  ) {

  }
}
