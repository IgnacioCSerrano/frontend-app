import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class PresupuestosService {

  constructor(private http: HttpClient) { }

  getPresupuestos(){ 
    let url = 'http://localhost:3000/presupuesto'; 
    return this.http.get(url) 
      .map( (res:any) => {
        return res;
      });
  }

  getTotalesPorCliente(){ 
    let url = 'http://localhost:3000/presupuesto/totales-cliente'; 
    return this.http.get(url) 
      .map( (res:any) => {
        return res;
      });
  }

  getPresupuestoId(id){ 
    let url = 'http://localhost:3000/presupuesto/'; 
    return this.http.get(url + id) 
      .map( (res:any) => {
        return res;
      });
  }

  postPresupuestos(presupuesto){ 
    let url = 'http://localhost:3000/presupuesto';
    return this.http.post(url, presupuesto)
      .map( (res:any) => {
        return res;
      });
  }

  putPresupuesto(id, presupuesto){ 
    let url = 'http://localhost:3000/presupuesto/'; 
    return this.http.put(url + id, presupuesto)
      .map( (res:any) => {
        return res;
      });
  }

  deletePresupuesto(id){
    let url = 'http://localhost:3000/presupuesto/';
    return this.http.delete(url + id)
      .map( (res:any) => {
        return res;
      });
  }
  
}
