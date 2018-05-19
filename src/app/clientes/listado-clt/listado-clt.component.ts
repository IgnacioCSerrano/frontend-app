import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listado-clt',
  templateUrl: './listado-clt.component.html',
  styleUrls: ['./listado-clt.component.css'],
})
export class ListadoCltComponent implements OnInit {

  buscadorNombre: FormControl;
  buscadorLocalidad: FormControl;
  buscadorNombreLocalidad: FormGroup;

  consulta:any;
  clientes:any;
  mensaje:boolean;

  searching:boolean = false;

  mostrarBuscadorNombre:boolean = true;
  mostrarBuscadorLocalidad:boolean = false;
  mostrarBuscadorNombreLocalidad:boolean = false;

  constructor(
    private clientesService: ClientesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() { 

    this.buscadorNombre = new FormControl();
    this.buscadorNombre.valueChanges
      .subscribe( nombre =>{
        this.searching = true;
        if(nombre.length !== 0){
          this.clientesService.getClientesNombre(nombre)
          .subscribe( (res:any)=>{
            this.searching = false;
            this.clientes = res.clientes;
            if (this.clientes.length === 0){
              this.mensaje = true;
            } else {
              this.mensaje = false;
            }
          }, (error)=>{
            this.searching = false;
            console.log(error);
          });
        } else {
          this.searching = false;
          this.clientes = [];
          this.mensaje = false;
        }
      });

    this.buscadorLocalidad = new FormControl(); 
    this.buscadorLocalidad.valueChanges
      .subscribe( localidad =>{ 
        this.searching = true;
        if(localidad.length !== 0){ 
          this.clientesService.getClientesLocalidad(localidad)
          .subscribe( (res:any)=>{
            this.searching = false;
            this.clientes = res.clientes;
            if (this.clientes.length === 0){  
              this.mensaje = true;
            } else {
              this.mensaje = false;
            }
          }, (error)=>{
            this.searching = false;
            console.log(error);
          });
        } else {
          this.searching = false;
          this.clientes = [];
          this.mensaje = false;
        }
      });

      this.buscadorNombreLocalidad = this.fb.group({
        nombre: null,
        localidad: null
      })
  
  }


  crearConsulta(){
    this.searching = true;
    this.consulta = this.guardarConsulta();
    this.clientesService.getClientesNombreLocalidad(this.consulta)
      .subscribe( (res:any)=>{
        this.searching = false;
        this.mensaje = false;
        this.clientes = res.clientes;
        if(this.clientes.length === 0){
          this.mensaje = true;
        }
        this.buscadorNombreLocalidad.reset();
      }, (error)=>{
        this.searching = false;
        console.log(error);
      })
  }

  guardarConsulta(){
    const guardarConsulta = {
      nombre: this.buscadorNombreLocalidad.get('nombre').value,
      localidad: this.buscadorNombreLocalidad.get('localidad').value
    }
    return guardarConsulta;
  }


  buscarPorNombre(){
    this.mostrarBuscadorNombre = true;
    this.mostrarBuscadorLocalidad = false;
    this.mostrarBuscadorNombreLocalidad = false;
    this.clientes = [];
    this.buscadorNombre.setValue('');
  }

  buscarPorLocalidad(){
    this.mostrarBuscadorLocalidad = true;
    this.mostrarBuscadorNombre = false;
    this.mostrarBuscadorNombreLocalidad = false;
    this.clientes = [];
    this.buscadorLocalidad.setValue('')
  }

  buscarPorNombreLocalidad(){
    this.mostrarBuscadorNombreLocalidad = true;
    this.mostrarBuscadorNombre = false;
    this.mostrarBuscadorLocalidad = false;
    this.clientes = [];
  }

}
