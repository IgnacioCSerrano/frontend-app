import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]) 
  ]
})
export class ListadoProvComponent implements OnInit {

  proveedores:any; 
  objectId:string;
  mensaje:string = 'Error de conexión con servidor';
  mostrarAlerta:boolean = false;

  desde:number = 0;
  totales:number;
  botones:number[] = [];
  numeroBotones:number;
  tramoBotones:number = 0;

  constructor(
    private proveedoresService: ProveedoresService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarProveedores(){ 
    this.proveedoresService.getProveedores(this.desde)
      .subscribe( (res:any) => {
        
        this.proveedores = res.proveedores;
        this.totales = res.totales;
        this.numeroBotones = this.totales / 5; 
        this.botones = [];
        var i;
        for(i = this.tramoBotones; i < this.tramoBotones + 5; i++){
          this.botones.push(i+1);
        }  

      }, error => {
        console.log(error);
      });
  }

  setDesde(valor){ 
    var desde = this.desde + valor; 
    if (desde >= this.totales){ 
      return; 
    } else if (desde < 0) {
      return; 
    } else {
      this.desde += valor; 
      this.cargarProveedores();
    }
  }

  updateDesde(valor){ 
    this.desde = valor;
    this.cargarProveedores();
  }

  forwardBotones(){
    if (this.desde % 25 === 0){ 
      this.botones = [];
      this.tramoBotones += 5;
      var i;
      for(i = this.tramoBotones; i < this.tramoBotones + 5; i++){
        this.botones.push(i+1); 
      }
    }
  }

  forwardTramoBotones(){
    this.tramoBotones += 5;
    this.desde = this.tramoBotones * 5;
    this.cargarProveedores();
  }

  backBotones(){
    if ((this.desde + 5) % 25 === 0){
      this.botones = [];
      this.tramoBotones -= 5;
      var i;
      for(i = this.tramoBotones; i < this.tramoBotones + 5; i++){
        this.botones.push(i+1); 
      }
    }
  }

  backTramoBotones(){
    this.tramoBotones -= 5;
    this.desde = this.tramoBotones * 5;
    this.cargarProveedores();
  }

  obtenerId(id){
    this.objectId = id;
  }

  borrarProveedor(){ 
    this.proveedoresService.deleteProveedor(this.objectId) 
      .subscribe( (res:any)=>{ 
        this.mensaje = 'Proveedor eliminado correctamente';
        this.mostrarAlerta = true;
        this.cargarProveedores();
        setTimeout(()=>{
          this.mostrarAlerta = false;
        }, 2000);
        setTimeout(()=>{
          this.mensaje = 'Error de conexión con servidor';
        }, 3000);
      }, (error:any)=>{
        if(error.error.mensaje == 'Token incorrecto'){
          this.mensaje = 'Tiempo de sesión finalizado, vuelva a acceder';
        }
        this.mostrarAlerta = true;
        setTimeout(()=>{
          this.mostrarAlerta = false;
        }, 5000);
      });

  }

}
