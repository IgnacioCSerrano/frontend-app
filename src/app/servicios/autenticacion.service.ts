import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class AutenticacionService {

  token:string;
  nombre:string;
  rol:string;
  objectId:string;
  lastLogin:any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.cargarCredenciales();
    this.cargarInicioSesion();
  }


  login(usuario){ 
    let url = 'http://localhost:3000/login';
    return this.http.post(url, usuario)
      .map( (res:any) => {
        this.guardarCredenciales(res.token, res.nombre, res.rol, res.objectId);
        this.guardarInicioSesion();
        return res;
      });
  }

  guardarCredenciales(token, nombre, rol, objectId){
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('rol', rol);
    localStorage.setItem('objectId', objectId);
    this.token = token;
    this.nombre = nombre;
    this.rol = rol;
    this.objectId = objectId;
  }

  cargarCredenciales(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
      this.rol = localStorage.getItem('rol');
      this.objectId = localStorage.getItem('objectId');;
    } else {
      this.token = '';
      this.nombre = '';
      this.rol = '';
      this.objectId = '';
    }
  }


  getUsuarios(){
    let url = 'http://localhost:3000/usuario';
    return this.http.get(url) 
      .map( (res:any) => {
        return res;
      });
  }

  getUsuarioId(id){
    let url = 'http://localhost:3000/usuario/';
    return this.http.get(url + id)
      .map( (res:any) => {
        return res;
      });
  }

  postUsuario(usuario){ 
    let url = 'http://localhost:3000/usuario';
    return this.http.post(url, usuario)
      .map( (res:any) => {
        return res;
      });
  }

  putUsuario(id, usuario){
    let url = 'http://localhost:3000/usuario/';
    return this.http.put(url+id, usuario)
      .map( (res:any) => {
        if (id === this.objectId) {
          localStorage.setItem('nombre',usuario.nombre);
          this.nombre = usuario.nombre;
        }
        return res;
      });
  }

  deleteUsuario(id){
    let url = 'http://localhost:3000/usuario/';
    return this.http.delete(url+id)
      .map( (res:any) => {
        console.log(res);
        return res;
      });
  }


  getSesiones(userId){
    let url = 'http://localhost:3000/sesion?id=' + userId;
    return this.http.get(url) 
      .map( (res:any) => {
        return res;
      });
  }

  postSesion(sesion){ 
    let url = 'http://localhost:3000/sesion';
    return this.http.post(url, sesion)
      .map( (res:any) => {
        return res;
      });
  }

  guardarInicioSesion(){
    var inicioSesion = new Date();
    localStorage.setItem('login', JSON.stringify(inicioSesion));
    this.lastLogin = inicioSesion;
  }

  cargarInicioSesion(){
    if(localStorage.getItem('login')){
      this.lastLogin = localStorage.getItem('login')
    } else {
      this.lastLogin = '';
    }
  }


  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    localStorage.removeItem('objectId');
    localStorage.removeItem('login');
    
    this.token = '';
    this.nombre = '';
    this.rol = '';
    this.objectId = '';
    this.lastLogin = '';
    this.router.navigate(['/']);

  }


  isLogged(){
    return ( this.token.length > 0 ) ? true : false;
  }


  getPermisoListadoUsuarios(){
    if(this.rol === 'Administrador') {
      return true;
    } else {
      return false;
    }
  }

  getPermisoCompras(){
    if(
      this.rol === 'Administrador' || 
      this.rol === 'Director de Compras' || 
      this.rol === 'Empleado de Compras'
    ){
      return true;
    } else {
      return false;
    }
  }

  getPermisoVentas(){
    if(
      this.rol === 'Administrador' || 
      this.rol === 'Director de Ventas' || 
      this.rol === 'Empleado de Ventas'
    ){
      return true;
    } else {
      return false;
    }
  }

  getPermisoProveedores(){
    if(
      this.rol === 'Administrador' || 
      this.rol === 'Director de Compras'
    ){
      return true;
    } else {
      return false;
    }
  }

  getPermisoClientes(){
    if(
      this.rol === 'Administrador' || 
      this.rol === 'Director de Ventas'
    ){
      return true;
    } else {
      return false;
    }
  }

  getPermisoInfo(){
    if(
      this.rol === 'Administrador' || 
      this.rol === 'User'
  ) {
      return true;
    } else {
      return false;
    }
  }

}
