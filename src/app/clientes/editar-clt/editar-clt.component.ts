import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-editar-clt',
  templateUrl: './editar-clt.component.html',
  styleUrls: ['./editar-clt.component.css'],
  animations: [
    trigger('alerta',[ 
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]) 
  ]
})
export class EditarCltComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  clienteForm:FormGroup;
  cliente:any;
  provincias:string[] = [
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
  ];
  mensaje:string = 'Error de conexión con servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  objectId:string;


  constructor(
    private cf: FormBuilder, 
    private clientesService: ClientesService, 
    private autenticacionService: AutenticacionService,
    private router: Router, 
    private route: ActivatedRoute
  ){ 
      if(!this.cliente){ 
        this.cliente = {}
      }
    } 

  ngOnInit() {
    this.objectId = this.route.snapshot.params['id'];
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
    this.cargarCliente(this.objectId);
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'
  }

  cargarCliente(id){
    this.clientesService.getClienteId(id)
      .subscribe( (res:any)=>{
        this.cliente = res.cliente;
      });
  }

  editarClt(){
    this.cliente = this.guardarClt();
    this.clientesService.putCliente(this.objectId, this.cliente)
      .subscribe( (res:any)=>{
        this.router.navigate(['/listado-clientes']);
        this.enviando = false;
      }, (error:any) => { 
        this.mostrarAlerta = true;
        this.enviando = false; 
        console.log(error);
        if(error.error){
          this.mensaje = 'CIF introducido ya existe';
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
