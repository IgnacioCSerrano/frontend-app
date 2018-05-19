import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AutenticacionService } from './autenticacion.service';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';

@Injectable()
export class ProveedoresService {

  token:string;

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService,
  ) { } 

  getProveedores(desde){ 
    let url = 'http://localhost:3000/proveedor?desde=' + desde;
    return this.http.get(url) 
      .map( (res:any) => { 
        return res;
      });
  }

  getProveedorId(id){
    let url = 'http://localhost:3000/proveedor/';
    return this.http.get(url + id)
      .map( (res:any) => {
        return res;
      });
  }

  postProveedores(proveedor){
    this.token = this.autenticacionService.token;
    let url = 'http://localhost:3000/proveedor';
    return this.http.post(url, proveedor)
      .map( (res:any) => {
        return res;
      });
  }

  putProveedor(id, proveedor){
    let url = 'http://localhost:3000/proveedor/';
    return this.http.put(url + id, proveedor)
      .map( (res:any) => {
        return res;
      });
  }

  deleteProveedor(id){
    this.token = this.autenticacionService.token;
    let url = 'http://localhost:3000/proveedor/' + id + '?token=' + this.token; 
    return this.http.delete(url)
      .map( (res:any) => {
        return res;
      });
  }
  
}
