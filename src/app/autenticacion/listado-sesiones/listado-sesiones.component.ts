import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-sesiones',
  templateUrl: './listado-sesiones.component.html',
  styleUrls: ['./listado-sesiones.component.css']
})
export class ListadoSesionesComponent implements OnInit {

  sesiones:any;
  userId:string;
  email:string;

  constructor(
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.cargarSesiones();
    this.getEmail();
  }

  cargarSesiones(){
    this.autenticacionService.getSesiones(this.userId)
      .subscribe( (res:any) => {
        this.sesiones = res.sesiones;
      });
  }

  getEmail(){
    this.autenticacionService.getUsuarioId(this.userId)
      .subscribe( (res:any) => {
        this.email = res.usuario.email;
      });
  }

}
