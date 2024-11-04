import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { VentaComponent } from './pages/venta/venta.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { CobranzasComponent } from './pages/cobranzas/cobranzas.component';
import { RealizarOCComponent } from './pages/realizar-oc/realizar-oc.component';
import { OrdenCompraComponent } from './pages/orden-compra/orden-compra.component';
import { OtrosComprobantesComponent } from './pages/otros-comprobantes/otros-comprobantes.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent, canActivate: [loginGuard]},
  {path: 'articulos', component: ArticulosComponent, canActivate: [loginGuard]},
  {path: 'empleados', component: EmpleadosComponent, canActivate: [loginGuard]},
  {path: 'proveedores', component: ProveedoresComponent, canActivate: [loginGuard]},
  {path: 'facturas', component: FacturaComponent, canActivate: [loginGuard]},
  {path: '', component: ArticulosComponent, canActivate: [loginGuard]},
  {path: 'venta', component: VentaComponent, canActivate: [loginGuard]},
  {path: 'cobranzas', component: CobranzasComponent, canActivate: [loginGuard]},
  {path: 'realizar-oc', component: RealizarOCComponent, canActivate: [loginGuard]},
  {path: 'ordenes-compra', component: OrdenCompraComponent, canActivate: [loginGuard]},
  {path: 'otros-comprobantes', component: OtrosComprobantesComponent, canActivate: [loginGuard]},
  {path: "login", component: LoginComponent, pathMatch: "full", canActivate: [homeGuard] },
  {path: '**', redirectTo: '', pathMatch: 'full', canActivate: [loginGuard]}





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }