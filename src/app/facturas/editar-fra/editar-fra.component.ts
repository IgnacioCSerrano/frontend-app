import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-editar-fra',
  templateUrl: './editar-fra.component.html',
  styleUrls: ['./editar-fra.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]) 
  ]
})
export class EditarFraComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  fraForm:FormGroup;
  factura:any;
  mensaje:string = 'Error de conexión con servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  objectId:string;

  cif:boolean; 
  base:number;
  tipo:number;
  irpf:number;
  retencion:boolean;
  importe:number;
  total:number;

  constructor(
    private ff: FormBuilder, 
    private facturasService: FacturasService,
    private autenticacionService: AutenticacionService,
    private router: Router, 
    private route: ActivatedRoute 
  ){ 
      if(!this.factura){ 
        this.factura = {} 
      }
    } 

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.objectId = this.route.snapshot.params['id'];
    this.fraForm = this.ff.group({
      proveedor: null, 
      cif: '',
      fecha: null,
      concepto: null,
      base: null,
      retencion: null, 
      tipo: null, 
      irpf: this.formatoMoneda(0), 
      importe: this.formatoMoneda(0),
      total: this.formatoMoneda(0)
    });
    this.cargarFactura(this.objectId);
    this.detectarCambios();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide'
  }

  cargarFactura(id){
    this.facturasService.getFacturaId(id)
      .subscribe( (res:any)=>{
        this.factura = res.factura;
      });
  }

  editarFra(){
    this.factura = this.guardarFra();
    this.facturasService.putFactura(this.objectId, this.factura)
      .subscribe( (res:any)=>{
        this.router.navigate(['/listado-facturas']);
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

  guardarFra(){
    const guardarFra = {
      proveedor: this.fraForm.get('proveedor').value,
      cif: this.fraForm.get('cif').value,
      fecha: this.fraForm.get('fecha').value,
      concepto: this.fraForm.get('concepto').value,
      base: this.fraForm.get('base').value,
      retencion: this.fraForm.get('retencion').value,
      tipo: this.fraForm.get('tipo').value,
      irpf: this.fraForm.get('irpf').value,
      importe: this.fraForm.get('importe').value,
      total: this.fraForm.get('total').value
    }
    return guardarFra;
  }

  redondear(valor){
    var valor;
    if(valor < 0) {
    var resultado = Math.round(-valor*100)/100 * -1; 
    } else {
        var resultado = Math.round(valor*100)/100; 
    }
    return resultado;
  }

  formatoMoneda(valor){
    var resultado = new Intl.NumberFormat("es-ES", {style: "currency", currency: "EUR"}).format(valor);
    return resultado;
  }

  detectarCambios(){
    this.fraForm.valueChanges.subscribe(valorForm =>{
      this.base = this.redondear(valorForm.base);
      this.retencion = valorForm.retencion;
      this.tipo = valorForm.tipo / 100;

      if(this.retencion){
        this.irpf = this.redondear(this.base * -0.15);
      } else {
        this.irpf = 0;
      }
      
      this.importe = this.redondear(this.base * this.tipo);
      this.total = this.redondear(this.base + this.irpf + this.importe);
      this.fraForm.value.irpf = this.formatoMoneda(this.irpf);
      this.fraForm.value.importe = this.formatoMoneda(this.importe);
      this.fraForm.value.total = this.formatoMoneda(this.total);
    });
  }

}
