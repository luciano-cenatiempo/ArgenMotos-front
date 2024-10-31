import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { VentaComponent } from './pages/venta/venta.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'articulos', component: ArticulosComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: '', component: ArticulosComponent},
  {path: 'venta', component: VentaComponent},


  {path: '**', redirectTo: '', pathMatch: 'full'}





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }