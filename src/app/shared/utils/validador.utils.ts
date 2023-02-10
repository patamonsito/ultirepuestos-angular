import { AbstractControl } from '@angular/forms';

export class Validador {

    static validarRUT(control: AbstractControl) {

        if(!control.value){
            return {};
        }

        rut = control.value.replaceAll('-', '').replaceAll('.', '').slice(0, -1) + '-' + control.value.slice(-1);
        if( rut ){
          let rutCompleto: any = rut.replaceAll("‐", "").replace(/\./g, "");
          if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
            return {
                rut_invalido: true
            };
          }
          var tmp = rutCompleto.split('-');
          var digv = tmp[1];
          var rut = tmp[0];
          if (digv == 'K') {
            digv = 'k';
          }

          let T = rut;
          var M = 0, S = 1;
          for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
            S ? S - 1 : 'k';

          let comprobar = S - 1 == digv || S - 1 == -1 ? null : { rut_invalido: true };

          return comprobar;
        }
        return {
            rut_invalido: true
        };
      }

}
