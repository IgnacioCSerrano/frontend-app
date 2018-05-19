import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../servicios/facturas.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-fra',
  templateUrl: './listado-fra.component.html',
  styleUrls: ['./listado-fra.component.css'],
  animations: [
    trigger('alerta',[ 
      state('show', style({opacity: 1})), 
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]) 
  ]
})
export class ListadoFraComponent implements OnInit {

  facturas:any; 
  objectId:string;
  mensaje:string = 'Error de conexión con servidor';
  mostrarAlerta:boolean = false;

  constructor(
    private facturasService: FacturasService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'
  }

  cargarFacturas(){ 
    this.facturasService.getFacturas() 
      .subscribe( (res:any) => { 
        this.facturas = res.facturas; 
      }, error => {
        console.log(error);
      });
  }

  obtenerId(id){
    this.objectId = id;
  }

  borrarFactura(){
    this.facturasService.deleteFactura(this.objectId) 
      .subscribe( (res:any)=>{
        this.mensaje = "Factura eliminada correctamente";
        this.mostrarAlerta = true;
        this.cargarFacturas();
        setTimeout(()=>{
          this.mostrarAlerta = false;
        }, 2000);
        setTimeout(()=>{
          this.mensaje = 'Error de conexión con servidor';
        }, 3000);
      }, (error:any)=>{
        this.mensaje = "Error de conexión con servidor";
        this.mostrarAlerta = true;
        setTimeout(()=>{
          this.mostrarAlerta = false;
        }, 5000);
    })
  }

}
