import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-ppto',
  templateUrl: './listado-ppto.component.html',
  styleUrls: ['./listado-ppto.component.css'],
})
export class ListadoPptoComponent implements OnInit {

  presupuestos:any = [];
  objectId:string;
  mensaje:string = 'Error de conexión con servidor';
  mostrarAlerta:boolean = false;

  constructor(
    private presupuestosService: PresupuestosService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.cargarPresupuestos();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarPresupuestos(){ 
    this.presupuestosService.getPresupuestos() 
      .subscribe( (res:any) => { 

        var presupuestos = res.presupuestos; 
        presupuestos.forEach(presupuesto => {
          var num = '0000' + presupuesto.numero + '/18';
          presupuesto.num = num.slice(-7);
          this.presupuestos.push(presupuesto);

        });
      }, error => {
        console.log(error);
      });
  }

  obtenerId(id){
    this.objectId = id;
  }

  borrarPresupuesto(){
    this.presupuestosService.deletePresupuesto(this.objectId) 
      .subscribe( (res:any)=>{
        this.presupuestos = [];
        this.cargarPresupuestos();
      },(error:any)=>{
        console.log(error);
    });
  }

}
