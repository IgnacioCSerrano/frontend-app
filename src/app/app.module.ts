import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ComprasComponent } from './compras/compras.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component'; 
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { FacturasService } from './servicios/facturas.service';
import { ListadoFraComponent } from './facturas/listado-fra/listado-fra.component';
import { CrearFraComponent } from './facturas/crear-fra/crear-fra.component';
import { EditarFraComponent } from './facturas/editar-fra/editar-fra.component';
import { FechaPipe } from './fecha.pipe';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesService } from './servicios/clientes.service';
import { ListadoCltComponent } from './clientes/listado-clt/listado-clt.component';
import { CrearCltComponent } from './clientes/crear-clt/crear-clt.component';
import { EditarCltComponent } from './clientes/editar-clt/editar-clt.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { ListadoPptoComponent } from './presupuestos/listado-ppto/listado-ppto.component';
import { CrearPptoComponent } from './presupuestos/crear-ppto/crear-ppto.component';
import { EditarPptoComponent } from './presupuestos/editar-ppto/editar-ppto.component';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';
import { ListadoSesionesComponent } from './autenticacion/listado-sesiones/listado-sesiones.component';
import { ArticulosService } from './servicios/articulos.service';
import { ListadoArticulosComponent } from './articulos/listado-articulos/listado-articulos.component'; 
import { CrearArticuloComponent } from './articulos/crear-articulo/crear-articulo.component';
import { EditarArticuloComponent } from './articulos/editar-articulo/editar-articulo.component';
import { MonedaPipe } from './moneda.pipe';


const rutas:Routes  = [
  {path:'', component: InicioComponent},
  {path:'registro', component: RegistroComponent}, 
  {path:'inicio-sesion', component: LoginComponent},
  {path:'compras', component: ComprasComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-sesiones/:id', component: ListadoSesionesComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-proveedores', component: ListadoProvComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-proveedor', component: CrearProvComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-proveedor/:id', component: EditarProvComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-facturas', component: ListadoFraComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-factura', component: CrearFraComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-factura/:id', component: EditarFraComponent, canActivate: [AutenticacionGuard]},
  {path:'ventas', component: VentasComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-clientes', component: ListadoCltComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-cliente', component: CrearCltComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-cliente/:id', component: EditarCltComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-presupuestos', component: ListadoPptoComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-presupuesto', component: CrearPptoComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-presupuesto/:id', component: EditarPptoComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-articulos', component: ListadoArticulosComponent, canActivate: [AutenticacionGuard]},
  {path:'crear-articulo', component: CrearArticuloComponent, canActivate: [AutenticacionGuard]},
  {path:'editar-articulo/:id', component: EditarArticuloComponent, canActivate: [AutenticacionGuard]},
  {path: '**', component: InicioComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFraComponent,
    CrearFraComponent,
    EditarFraComponent,
    RegistroComponent,
    LoginComponent,
    VentasComponent,
    ListadoCltComponent,
    CrearCltComponent,
    EditarCltComponent,
    ListadoPptoComponent,
    CrearPptoComponent,
    EditarPptoComponent,
    ListadoUsuariosComponent,
    ListadoSesionesComponent,
    ListadoArticulosComponent,
    CrearArticuloComponent,
    EditarArticuloComponent,
    FechaPipe,
    MonedaPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas), 
    HttpClientModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    ChartsModule 
  ],
  providers: [ProveedoresService, FacturasService, ClientesService, PresupuestosService, AutenticacionService, ArticulosService, AutenticacionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
