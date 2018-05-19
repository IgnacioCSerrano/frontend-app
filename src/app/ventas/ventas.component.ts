import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../servicios/presupuestos.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  chartOptions = {
    responsive: true
  }

  presupuestos:any;

  pptoMes1:any;
  pptoMes2:any;
  pptoMes3:any;

  totalMes1:number = 0;
  totalMes2:number = 0;
  totalMes3:number = 0;

  diaMes1:any = new Date("2018-01-01").valueOf();
  diaMes2:any = new Date("2018-02-01").valueOf();
  diaMes3:any = new Date("2018-03-01").valueOf();
  diaMes4:any = new Date("2018-04-01").valueOf();

  mes1:string = 'Enero';;
  mes2:string = 'Febrero';
  mes3:string = 'Marzo';

  labelTrimestre:string = 'Presupuestos T1';

  chartPptosTrimestre:any = [];
  chartTotalesPorCliente:any = [];
  totalPorCliente:any;

  constructor(private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.cargarGraficoPresupuestos();
    this.cargarGraficoClientes();
  }
  
  cargarGraficoPresupuestos(){
    this.presupuestosService.getPresupuestos()
      .subscribe( (res:any)=>{
        this.presupuestos = res.presupuestos;

        this.pptoMes1 = this.presupuestos.filter(element =>
          new Date(element.fecha).valueOf() >= this.diaMes1 && 
          new Date(element.fecha).valueOf() < this.diaMes2
        );
        this.pptoMes1.forEach(pptoMes1=>{
          this.totalMes1 += pptoMes1.suma;
        });
    
        this.pptoMes2 = this.presupuestos.filter(element =>
        new Date(element.fecha).valueOf() >= this.diaMes2 && 
        new Date(element.fecha).valueOf() < this.diaMes3
        );
        this.totalMes2 = 0;
        this.pptoMes2.forEach(pptoMes2=>{
          this.totalMes2 += pptoMes2.suma; 
        });

        this.pptoMes3 = this.presupuestos.filter(element =>
        new Date(element.fecha).valueOf() >= this.diaMes3 && 
        new Date(element.fecha).valueOf() < this.diaMes4
        );
        this.totalMes3 = 0;
        this.pptoMes3.forEach(pptoMes3=>{
          this.totalMes3 += pptoMes3.suma;
        });

        this.chartPptosTrimestre = new Chart('grafico1',{
          type: 'line',
          data: {
            labels: [this.mes1,this.mes2,this.mes3],
            datasets: [
              {
                data: [this.totalMes1,this.totalMes2,this.totalMes3],
                label: this.labelTrimestre,
                borderColor: 'crimson',
                fill: false
              }
            ]
          }
        });
      }, (error)=>{
        console.log(error);
      });
  }

  cargarGraficoClientes(){
    this.presupuestosService.getTotalesPorCliente()
      .subscribe( (res:any)=>{
        this.totalPorCliente = res.datos;
        let clientes = [];
        let totales = [];
        this.totalPorCliente.forEach(element =>{
          clientes.push(element._id.cliente);
          totales.push(element.total);
        });
        this.chartTotalesPorCliente = new Chart('grafico2',{
          type: 'pie',
          data: {
            labels: clientes,
            datasets: [
              {
                backgroundColor: ['red','green','blue'],
                data: totales
              }
            ]
          }
        })
      }, (error)=>{
        console.log(error);
      });
  }

  primerTrimestre(){
    this.diaMes1 = new Date("2018-01-01").valueOf();
    this.diaMes2 = new Date("2018-02-01").valueOf();
    this.diaMes3 = new Date("2018-03-01").valueOf();
    this.diaMes4 = new Date("2018-04-01").valueOf();
    this.totalMes1 = 0;
    this.totalMes2 = 0;
    this.totalMes3 = 0;  
    this.mes1 = 'Enero';
    this.mes2 = 'Febrero';
    this.mes3 = 'Marzo';
    this.labelTrimestre = 'Presupuestos T1';

    this.chartPptosTrimestre.destroy(); 
    this.cargarGraficoPresupuestos();
  }

  segundoTrimestre(){
    this.diaMes1 = new Date("2018-04-01").valueOf();
    this.diaMes2 = new Date("2018-05-01").valueOf();
    this.diaMes3 = new Date("2018-06-01").valueOf();
    this.diaMes4 = new Date("2018-07-01").valueOf();
    this.totalMes1 = 0;
    this.totalMes2 = 0;
    this.totalMes3 = 0;  
    this.mes1 = 'Abril';
    this.mes2 = 'Mayo';
    this.mes3 = 'Junio';
    this.labelTrimestre = 'Presupuestos T2';

    this.chartPptosTrimestre.destroy();
    this.cargarGraficoPresupuestos();
  }

}
