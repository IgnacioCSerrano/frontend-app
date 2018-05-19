import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  animations: [
    trigger('alerta',[ 
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})), 
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out')) 
    ]) 
  ]
})
export class RegistroComponent implements OnInit {

  @ViewChild('nombre') nombreRef: ElementRef;

  registroForm:FormGroup;
  usuario:any;
  mensaje:string = 'Error de conexión con servidor'; 
  mostrarAlerta:boolean = false;
  enviando:boolean = false;


  constructor(
    private fr: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registroForm = this.fr.group({
      nombre: ['', Validators.required],
      email: ['', Validators.email], 
      password: ['', /* [ */ Validators.required, /* Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')] */ ],
      confirm: '',
      rol: 'User'
    });
    this.nombreRef.nativeElement.focus();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'
  }

  registroUsuario(){
    this.mostrarAlerta = false;
    this.enviando = true;

    this.usuario = this.guardarUsuario();

    this.autenticacionService.postUsuario(this.usuario)
      .subscribe( (res:any)=>{ 
        this.enviando = false;
      }, (error:any) => {
        this.mostrarAlerta = true;
        this.enviando = false;
        console.log(error);
        if(error.error.errores.errors.email.message){
          this.mensaje = error.error.errores.errors.email.message;
        }
      });

      setTimeout(()=>{
        this.autenticacionService.login(this.usuario)
        .subscribe( (res:any) => {
          this.enviando = false;
          this.router.navigate(['/']);
        }, (error:any) => {
          this.mostrarAlerta = true;
          if(error.error.mensaje){
            this.mensaje = error.error.mensaje;
          }
        })
      }, 10);

  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value.toLowerCase(),
      password: this.registroForm.get('password').value,
      rol: 'User'
    }
    
    return guardarUsuario;
  }

}
