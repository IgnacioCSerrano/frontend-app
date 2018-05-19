import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class FacturasService {

  constructor(private http: HttpClient) { }

  getFacturas(){ 
    let url = 'http://localhost:3000/factura'; 
    return this.http.get(url) 
      .map( (res:any) => {
        return res;
      });
  }

  getFacturaId(id){ 
    let url = 'http://localhost:3000/factura/'; 
    return this.http.get(url + id) 
      .map( (res:any) => {
        return res;
      });
  }

  postFacturas(factura){ 
    let url = 'http://localhost:3000/factura';
    return this.http.post(url, factura)
      .map( (res:any) => {
        return res;
      });
  }

  putFactura(id, factura){ 
    let url = 'http://localhost:3000/factura/'; 
    return this.http.put(url + id, factura)
      .map( (res:any) => {
        return res;
      });
  }

  deleteFactura(id){
    let url = 'http://localhost:3000/factura/';
    return this.http.delete(url + id)
      .map( (res:any) => {
        return res;
      });
  }
  
}
