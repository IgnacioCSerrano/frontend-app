import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticulosService } from '../../servicios/articulos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.component.html',
  styleUrls: ['./editar-articulo.component.css']
})
export class EditarArticuloComponent implements OnInit {

  articuloForm: FormGroup;
  articulo:any;
  objectId:string;

  constructor(
    private af: FormBuilder,
    private articulosService: ArticulosService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private route: ActivatedRoute 
  ) { 
      if(!this.articulo){ 
      this.articulo = {} 
    }
  }

  ngOnInit() {
    this.objectId = this.route.snapshot.params['id'];
    this.articuloForm = this.af.group({
      referencia: null,
      precio: null
    });
    this.cargarArticulo(this.objectId);
  }

  cargarArticulo(id){
    this.articulosService.getArticuloId(id) 
      .subscribe( (res:any)=>{ 
        this.articulo = res.articulo; 
      });
  }

  editarArticulo(){
    this.articulo = this.guardarArticulo(); 
    this.articulosService.putArticulo(this.objectId, this.articulo) 
      .subscribe( (res:any)=>{ 
        this.router.navigate(['/listado-articulos']);
      }, (error:any) => { 
        console.log(error);
      });
  }

  guardarArticulo(){ 
    const guardarArticulo = {
      referencia: this.articuloForm.get('referencia').value,
      precio: this.articuloForm.get('precio').value
    }
    return guardarArticulo;
  }

}
