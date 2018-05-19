import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticulosService {

  constructor(private http: HttpClient) { }

  getArticulos(){
    let url = 'http://localhost:3000/articulo';
    return this.http.get(url)
      .map((res:any)=>{
        return res;
      });
  }

  getArticuloId(id){
    let url = 'http://localhost:3000/articulo/';
    return this.http.get(url + id)
      .map( (res:any) => {
        return res;
      });
  }

  postArticulos(articulo){
    let url = 'http://localhost:3000/articulo';
    return this.http.post(url, articulo)
      .map((res:any)=>{
        return res;
      });
  }

  putArticulo(id, articulo){
    let url = 'http://localhost:3000/articulo/';
    return this.http.put(url + id, articulo)
      .map( (res:any) => {
        return res;
      });
  }

  deleteArticulo(id){ 
    let url = 'http://localhost:3000/articulo/'
    return this.http.delete(url + id)
      .map( (res:any) => {
        return res;
      });
  }

}
