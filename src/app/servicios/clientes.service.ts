import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes(){
    let url = 'http://localhost:3000/cliente';
    return this.http.get(url)
      .map( (res:any) => {
        return res;
      });
  }

  getClientesNombre(nombre){
    let url = 'http://localhost:3000/cliente/nombre/' + nombre;
    return this.http.get(url)
      .map( (res:any) => {
        return res;
      });
  }

  getClientesLocalidad(localidad){
    let url = 'http://localhost:3000/cliente/localidad/' + localidad;
    return this.http.get(url) 
      .map( (res:any) => {
        return res;
      });
  }

  getClientesNombreLocalidad(consulta){
    let url = 'http://localhost:3000/cliente/mixta/' + consulta.nombre + '/' + consulta.localidad;
    return this.http.get(url) 
      .map( (res:any) => {
        return res;
      });
  }
  
  getClienteId(id){
    let url = 'http://localhost:3000/cliente/';
    return this.http.get(url + id)
      .map( (res:any) => {
        return res;
      });
  }

  postClientes(cliente){
    let url = 'http://localhost:3000/cliente';
    return this.http.post(url, cliente)
      .map( (res:any) => {
        return res;
      });
  }

  putCliente(id, cliente){
    let url = 'http://localhost:3000/cliente/';
    return this.http.put(url + id, cliente)
      .map( (res:any) => {
        return res;
      });
  }

  deleteCliente(id){
    let url = 'http://localhost:3000/cliente/';
    return this.http.delete(url + id)
      .map( (res:any) => {
        return res;
      });
  }
  
}
