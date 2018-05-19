import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {

  transform(value: any, redondeo: any, simbolo: any): any { 
    var red:number = Math.pow(10, redondeo); 
    if(value < 0) { 
        var resultado = Math.round(-value*red)/red * -1; 
    } else {
        var resultado = Math.round(value*red)/red; 
    }

    var opciones = {minimumFractionDigits:2, maximumFractionDigits:4};
    var resultadoForm = new Intl.NumberFormat("es-ES", opciones).format(resultado); 

    if(simbolo === 'euro') {
      var simb = ' €'
      return resultadoForm + simb;
    } else if ( simbolo === 'libra') {
      var simb = ' £'
      return resultadoForm + simb;
    } else if ( simbolo === 'dólar') {
      var simb = ' $'
      return resultadoForm + simb;
    }

    return resultadoForm;
  }

}
