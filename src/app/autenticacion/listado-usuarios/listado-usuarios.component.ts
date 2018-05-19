import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  animations: [
    trigger('formulario',[ 
      state('show', style({
        visibility: 'visible',
        opacity: 1,
        height: 100
      })), 
      state('hide', style({
        visibility: 'hidden', 
        opacity: 0,
        height: 0
      })), 
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ]),
    trigger('alerta',[ 
      state('show', style({opacity: 1})), 
      state('hide', style({opacity: 0})), 
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ]) 
  ]
})
export class ListadoUsuariosComponent implements OnInit {

  @ViewChild('nuevo') nuevoRef: ElementRef;
  @ViewChild('editado') editadoRef: ElementRef;

  crearUsuarioForm: FormGroup;
  editarUsuarioForm : FormGroup;

  usuarios:any;
  usuario:any;
  objectId:string;
  nuevoUsuario:any;
  editarFila:string;

  mostrarFormulario:boolean = false;
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  mensaje:string = 'Error de conexión con servidor';

  online:any = [];

  constructor(
    private autenticacionService: AutenticacionService,
    private cuf: FormBuilder,
    private euf: FormBuilder,
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.crearUsuarioForm = this.cuf.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      rol: [null, Validators.required]
    });
    this.editarUsuarioForm = this.euf.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      rol: [null, Validators.required]
    });
  }

  verFormulario(){
    this.mostrarFormulario = !this.mostrarFormulario; 
    setTimeout( () => { 
      this.nuevoRef.nativeElement.focus();
      this.crearUsuarioForm.reset();
    }, 600);
  }

  get estadoFormulario(){
    return this.mostrarFormulario ? 'show' : 'hide';
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarUsuarios(){
    this.autenticacionService.getUsuarios()
      .subscribe( (res:any) => {
        this.usuarios = res.usuarios;
        this.usuarios.forEach(usuario => {
          this.autenticacionService.getSesiones(usuario._id)
          .subscribe( (res:any) => {
            if(res.sesiones.length % 2 !== 0){
              this.online.push(true);
            } else {
              this.online.push(false);
            }
          }, (error) => {
            console.log(error);
          });
        });
      }, (error) => {
        console.log(error);
      })
  }

  crearUsuario(){
    this.enviando = true;
    this.nuevoUsuario = this.guardarNuevoUsuario();
    this.autenticacionService.postUsuario(this.nuevoUsuario)
      .subscribe( (res:any) => {
        this.enviando = false;
        this.mostrarAlerta = true;
        this.mensaje = 'Usuario creado correctamente';
        this.crearUsuarioForm.reset(); 
        this.cargarUsuarios();
        setTimeout( () => {
          this.mostrarAlerta = false;
        }, 2000);
        setTimeout( () => {
          this.mensaje = 'Error de conexión con servidor';
        }, 2500);
      }, (error:any) => {
        this.mostrarAlerta = true;
        this.enviando = false;
        console.log(error);
        if(error.error.errores.errors.email.message){
          this.mensaje = error.error.errores.errors.email.message;
        }
        setTimeout( () => {
          this.mostrarAlerta = false; 
        }, 2000);
        setTimeout( () => {
          this.mensaje = 'Error de conexión con servidor';
        }, 2500);
      });
  }

  guardarNuevoUsuario(){
    const guardarNuevoUsuario = {
      nombre: this.crearUsuarioForm.get('nombre').value,
      email: this.crearUsuarioForm.get('email').value.toLowerCase(),
      password: this.crearUsuarioForm.get('password').value,
      rol: this.crearUsuarioForm.get('rol').value
    }

    return guardarNuevoUsuario;
  }

  modificarUsuario(id){
    this.editarFila = id;
    setTimeout( () => {
      this.editadoRef.nativeElement.focus();
    }, 10);    
  }

  cancelarEdicion(){
    this.editarFila = '';
    this.cargarUsuarios();
  }

  editarUsuario(id){
    this.enviando = true;
    this.usuario = this.guardarUsuarioEditado();
    this.autenticacionService.putUsuario(id, this.usuario)
      .subscribe( (res:any) => { 
        this.enviando = false;
        this.mostrarAlerta = true;
        this.mensaje = 'Usuario actualizado correctamente';
        this.editarFila = '';
        this.cargarUsuarios();
        setTimeout( () => {
          this.mostrarAlerta = false;
        }, 2000);
        setTimeout( () => {
          this.mensaje = 'Error de conexión con servidor';
        }, 2500);
      }, (error:any) => {
        this.mostrarAlerta = true;
        this.enviando = false;
        console.log(error);
        if(error.error.errores.errors.email.message){
          this.mensaje = error.error.errores.errors.email.message;
        }
        setTimeout( () => {
          this.mostrarAlerta = false; 
        }, 2000);
        setTimeout( () => {
          this.mensaje = 'Error de conexión con servidor';
        }, 2500);
      });
  }

  guardarUsuarioEditado(){
    const guardarUsuarioEditado = {
      nombre: this.editarUsuarioForm.get('nombre').value,
      email: this.editarUsuarioForm.get('email').value.toLowerCase(),
      rol: this.editarUsuarioForm.get('rol').value
    }

    return guardarUsuarioEditado;
  }

  obtenerId(id){
    this.objectId = id;
  }

  borrarUsuario(){
    this.autenticacionService.deleteUsuario(this.objectId)
      .subscribe( (res:any)=>{ 
        this.mensaje = 'Usuario eliminado correctamente';
        this.mostrarAlerta = true;
        this.cargarUsuarios();
        setTimeout( () => {
          this.mostrarAlerta = false; 
        }, 2000);
        setTimeout( () => {
          this.mensaje = 'Error de conexión con servidor';
        }, 2500);   
      }, (error:any) => {
        this.mostrarAlerta = true;
        setTimeout( () => {
          this.mostrarAlerta = false;
        }, 2000);
      });
  }
  
}
