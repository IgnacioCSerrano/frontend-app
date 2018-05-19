import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  sesion:any;

  constructor(private autenticacionService: AutenticacionService) { }

  ngOnInit() {
  }

  getLogged(){
    return this.autenticacionService.isLogged();
  }

  crearSesionCierre(){

    var lastLogin = JSON.parse(localStorage.getItem('login'));
    var lastLoginMiliseg = new Date(lastLogin).valueOf();
    var fechaActualMiliseg = new Date().valueOf();
    var duracionSeg = (fechaActualMiliseg - lastLoginMiliseg) / 1000;

    var s = Math.floor(duracionSeg % 60);
    var ss = ("0" + s).slice(-2);
    var m = Math.floor( (duracionSeg % 3600) / 60);
    var mm = ("0" + m).slice(-2);
    var h = Math.floor(duracionSeg / 3600);
    var hh = ("0" + h).slice(-2);

    this.sesion = {
      nombre: this.autenticacionService.nombre, 
      userId: this.autenticacionService.objectId,
      logout: new Date(),
      duracion: hh + ' horas, ' + mm + ' minutos, ' + ss + ' segundos.'
    }

    this.autenticacionService.postSesion(this.sesion)
      .subscribe( (res) => {
      }, (error) => {
        console.log(error);
      });

  }

}
