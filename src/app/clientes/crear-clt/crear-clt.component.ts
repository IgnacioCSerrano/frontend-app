import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-clt',
  templateUrl: './crear-clt.component.html',
  styleUrls: ['./crear-clt.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out')) 
    ]) 
  ]
})
export class CrearCltComponent implements OnInit {

  @ViewChild('nombre') nombreRef: ElementRef;
  @ViewChild('cif') cifRef: ElementRef;

  clienteForm:FormGroup;
  cliente:any;
  provincias:string[] = [
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
  ];
  mensaje:string = 'Error de conexión con servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;

  constructor(
    private cf: FormBuilder,
    private clientesService: ClientesService, 
    private router: Router
  ) { } 

  ngOnInit() {
    this.clienteForm = this.cf.group({
      nombre: null,
      cif :null,
      direccion: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null
    });
    this.nombreRef.nativeElement.focus();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'
  }

  crearClt(){
    this.mostrarAlerta = false;
    this.enviando = true;
    this.cliente = this.guardarClt();
    this.clientesService.postClientes(this.cliente)
      .subscribe( (res:any) => { 
        this.router.navigate(['/listado-clientes']);
        this.enviando = false;
      }, (error:any) => {
        this.mostrarAlerta = true;
        this.enviando = false;
        console.log(error);
        if(error.error.errores.errors.cif.message){
          this.mensaje = error.error.errores.errors.cif.message;
          this.cifRef.nativeElement.focus();
        }
      });
  }

  guardarClt(){ 
    const guardarClt = {
      nombre: this.clienteForm.get('nombre').value,
      cif: this.clienteForm.get('cif').value,
      direccion: this.clienteForm.get('direccion').value,
      cp: this.clienteForm.get('cp').value,
      localidad: this.clienteForm.get('localidad').value,
      provincia: this.clienteForm.get('provincia').value,
      telefono: this.clienteForm.get('telefono').value,
      email: this.clienteForm.get('email').value,
      contacto: this.clienteForm.get('contacto').value
    }
    return guardarClt;
  }

}
