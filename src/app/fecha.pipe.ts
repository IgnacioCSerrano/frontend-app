import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    var actual = new Date(value);
    var dia = actual.getDate();
    var mes = actual.getMonth();
    var ano = actual.getFullYear();
    var diaSemana = actual.getDay();
    var diaSemanaTexto;
    var mesTexto;
    var estacion;
    var diasSemana = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

    switch (diaSemana){  
        case 0:
            diaSemanaTexto = diasSemana[6] 
            break; 
        case 1:
            diaSemanaTexto = diasSemana[0];
            break;
        case 2:
            diaSemanaTexto = diasSemana[1];
            break;
        case 3:
            diaSemanaTexto = diasSemana[2];
            break;
        case 4:
            diaSemanaTexto = diasSemana[3];
            break;
        case 5:
            diaSemanaTexto = diasSemana[4];
            break;
        case 6:
            diaSemanaTexto = diasSemana[5];
            break;
    }

    switch(mes) {
        case 0: 
            mesTexto = "enero"
            break;
        case 1: 
            mesTexto = "febrero"
            break;
        case 2: 
            mesTexto = "marzo"
            break;
        case 3: 
            mesTexto = "abril"
            break;
        case 4: 
            mesTexto = "mayo"
            break;
        case 5: 
            mesTexto = "junio"
            break;
        case 6: 
            mesTexto = "julio"
            break;
        case 7: 
            mesTexto = "agosto"
            break; 
        case 8: 
            mesTexto = "septiembre"
            break;
        case 9: 
            mesTexto = "octubre"
            break;
        case 10: 
            mesTexto = "noviembre"
            break;
        case 11: 
            mesTexto = "diciembre"
            break;   
    }

    var fecha = diaSemanaTexto + ", " + dia + " de " + mesTexto + " de " + ano;
    
    return fecha;       
  }

}
