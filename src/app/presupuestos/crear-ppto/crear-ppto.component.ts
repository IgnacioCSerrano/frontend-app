import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';
import { ArticulosService } from '../../servicios/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ppto',
  templateUrl: './crear-ppto.component.html',
  styleUrls: ['./crear-ppto.component.css'],
})
export class CrearPptoComponent implements OnInit {

  pptoForm:FormGroup;
  presupuesto:any;
  clientes:any;
  articulos:any;

  constructor(
    private pf: FormBuilder,
    private presupuestosService: PresupuestosService,
    private clientesService: ClientesService,
    private articulosService: ArticulosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatos();
    this.pptoForm = this.pf.group({
      cliente: null,
      cif: null,
      fecha: null,
      items: this.pf.array([
        this.initItem() 
      ]),
      suma: 0,
      total: this.formatoMoneda(0)
    });
  }

  ngAfterViewChecked(){
    this.detectarCambios();
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
        
        var nombre = valor.cliente; 
        var clienteCargado = this.clientes.find(function(cliente){
          return cliente.nombre === nombre;
        });

        if(clienteCargado){ 
          this.pptoForm.value.cif = clienteCargado.cif;
        } else { 
          this.pptoForm.value.cif = ''; 
        }

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
            this.pptoForm.value.items[i].precio = this.formatoMoneda(0);
            this.pptoForm.value.items[i].iva = this.formatoMoneda(0); 
            this.pptoForm.value.items[i].importe = this.formatoMoneda(0);
          }

        }

        this.pptoForm.value.suma = suma;
        this.pptoForm.value.total = this.formatoMoneda(suma);

      });
  }

  crearPresupuesto(){
    this.presupuesto = this.guardarPresupuesto();
    this.presupuestosService.postPresupuestos(this.presupuesto)
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
      total: this.pptoForm.get('total').value
    }
    return guardarPresupuesto;
  }

}
