import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';
import { ArticulosService } from '../../servicios/articulos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-ppto',
  templateUrl: './editar-ppto.component.html',
  styleUrls: ['./editar-ppto.component.css'],
})
export class EditarPptoComponent implements OnInit {

  pptoForm:FormGroup;
  presupuesto:any;
  clientes:any;
  articulos:any;

  objectId:string;

  constructor(
    private pf: FormBuilder,
    private presupuestosService: PresupuestosService,
    private clientesService: ClientesService,
    private articulosService: ArticulosService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private route: ActivatedRoute
  ){
    setTimeout(()=>{
      this.detectarCambios();
    }, 1);

    if(!this.articulos){
      this.articulos = [];
    }
  } 

  ngOnInit() {
    this.objectId = this.route.snapshot.params['id'];
    this.cargarPresupuesto(this.objectId);
    this.cargarDatos();
    this.pptoForm = this.pf.group({
      num: null,
      cliente: null,
      cif: null,
      fecha: null,
      items: this.pf.array([
        this.initItem() 
      ]),
      suma: 0,
      total: null
    });
  }

  cargarPresupuesto(id){
    this.presupuestosService.getPresupuestoId(id)
      .subscribe( (res:any)=>{
        this.presupuesto = res.presupuesto;
        this.patchForm();
      }, (error)=>{
        console.log(error);
      });
  }

  cargarDatos(){
    this.clientesService.getClientes()
      .subscribe( (res:any)=>{
        this.clientes = res.clientes;
      }, (error)=>{
        console.log(error);
      });
    this.articulosService.getArticulos()
      .subscribe( (res:any)=>{
        this.articulos = res.articulos;
      }, (error)=>{
        console.log(error);
      });
  }

  patchForm(){
    var numero = '000' + this.presupuesto.numero + '/18'
    this.pptoForm.patchValue({
      num: numero.slice(-7), 
      cliente: this.presupuesto.cliente,
      cif: this.presupuesto.cif,
      fecha: this.presupuesto.fecha,
      suma: this.presupuesto.suma,
      total: this.presupuesto.total
    });
    this.setPresupuestoItems();
  }

  setPresupuestoItems(){
    let control = <FormArray>this.pptoForm.controls.items;
    this.presupuesto.items.forEach(element => {
      control.push(this.pf.group({ 
        articulo: element.articulo,
        cantidad: element.cantidad,
        tipo: element.tipo,
        precio: element.precio,
        iva: element.iva,
        importe: element.importe,
      }));
    });
    this.removeItem(0);
  }

  initItem(){
    return this.pf.group({
      articulo: null,
      cantidad: null,
      tipo: 21,
      precio: this.formatoMoneda(0),
      iva: this.formatoMoneda(0),
      importe: this.formatoMoneda(0)
    });
  }

  addItem(){
    const control = <FormArray>this.pptoForm.controls['items']; 
    control.push(this.initItem());
  }

  removeItem(i){
    const control = <FormArray>this.pptoForm.controls['items'];
    control.removeAt(i);
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
    this.pptoForm.valueChanges 
      .subscribe( valor => { 

        var cantidad = 0;
        var precio = 0;
        var iva = 0;
        var importe = 0;
        var suma = 0;
        var i;

        for(i=0; i<valor.items.length; i++){ 

          var referencia = valor.items[i].articulo; 
          var articuloCargado = this.articulos.find(function(articulo){
          return articulo.referencia === referencia;
          });

          if(articuloCargado){

            cantidad = valor.items[i].cantidad;
            precio = this.redondear(articuloCargado.precio);
            iva = this.redondear( precio * (valor.items[i].tipo / 100) );
            importe = this.redondear(cantidad * (precio + iva));

            this.pptoForm.value.items[i].precio = this.formatoMoneda(precio); 
            this.pptoForm.value.items[i].iva = this.formatoMoneda(iva);
            this.pptoForm.value.items[i].importe = this.formatoMoneda(importe);
  
            suma += importe;

          } else {
            this.pptoForm.value.items[i].precio = 0;
            this.pptoForm.value.items[i].iva = 0;
            this.pptoForm.value.items[i].importe = 0;
          }

        }

        this.pptoForm.value.suma = suma;
        this.pptoForm.value.total = this.formatoMoneda(suma);

      });
  }

  editarPresupuesto(){
    this.presupuesto = this.guardarPresupuesto();
    this.presupuestosService.putPresupuesto(this.objectId, this.presupuesto)
      .subscribe( (res:any)=>{
        this.router.navigate(['/listado-presupuestos']);
      }, (error)=>{
        console.log(error);
      });
  }

  guardarPresupuesto(){
    const guardarPresupuesto = {
      cliente: this.pptoForm.get('cliente').value,
      cif: this.pptoForm.get('cif').value,
      fecha: this.pptoForm.get('fecha').value,
      items: this.pptoForm.get('items').value,
      suma: this.pptoForm.value.suma,
      total: this.pptoForm.get('total').value,
    }
    return guardarPresupuesto;
  }

}
