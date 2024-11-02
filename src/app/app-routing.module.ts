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

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'articulos', component: ArticulosComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'facturas', component: FacturaComponent},
  {path: '', component: ArticulosComponent},
  {path: 'venta', component: VentaComponent},
  {path: 'cobranzas', component: CobranzasComponent},
  {path: 'realizar-oc', component: RealizarOCComponent},
  {path: 'ordenes-compra', component: OrdenCompraComponent},
  {path: 'otros-comprobantes', component: OtrosComprobantesComponent},


  {path: '**', redirectTo: '', pathMatch: 'full'}





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }