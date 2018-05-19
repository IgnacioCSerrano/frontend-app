import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-editar-prov',
  templateUrl: './editar-prov.component.html',
  styleUrls: ['./editar-prov.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')), 
      transition('hide => show', animate('500ms ease-out'))
    ]) 
  ]
})
export class EditarProvComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  proveedorForm:FormGroup;
  proveedor:any;
  provincias:string[] = [
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
  ];
  mensaje:string = 'Error de conexión con servidor'; 
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  objectId:string;

  constructor(
    private pf: FormBuilder, 
    private proveedoresService: ProveedoresService,
    private autenticacionService: AutenticacionService,
    private router: Router, 
    private route: ActivatedRoute
  ){ 
      if(!this.proveedor){ 
        this.proveedor = {};
      }
    } 

  ngOnInit() {
    this.objectId = this.route.snapshot.params['id'];
    this.proveedorForm = this.pf.group({
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
    this.cargarProveedor(this.objectId);
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarProveedor(id){
    this.proveedoresService.getProveedorId(id)
      .subscribe( (res:any)=>{ 
        this.proveedor = res.proveedor;
      });
  }

  editarProv(){
    this.proveedor = this.guardarProv();
    this.proveedoresService.putProveedor(this.objectId, this.proveedor)
      .subscribe( (res:any)=>{
        this.router.navigate(['/listado-proveedores']);
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

  guardarProv(){
    const guardarProv = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    }
    return guardarProv;
  }

}
