import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../servicios/articulos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.css']
})
export class ListadoArticulosComponent implements OnInit {

  articulos:any;
  objectId:string;

  constructor(
    private articulosService: ArticulosService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos(){
    this.articulosService.getArticulos()
      .subscribe( (res:any)=>{
        this.articulos = res.articulos;
      }, (error)=>{
        console.log(error);
      });
  }

  obtenerId(id){
    this.objectId = id;
  }

  borrarArticulo(){
    this.articulosService.deleteArticulo(this.objectId) 
      .subscribe( (res:any)=>{
        this.cargarArticulos();
      },(error:any)=>{
        console.log(error);
    })
  }

}
