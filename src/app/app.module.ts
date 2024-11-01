import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadoFormComponent } from './pages/empleado-form/empleado-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import {MatSelectModule} from '@angular/material/select';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProveedorFormComponent } from './pages/proveedor-form/proveedor-form.component';
import { ArticuloFormComponent } from './pages/articulo-form/articulo-form.component';
import { VentaComponent } from './pages/venta/venta.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { FacturaComponent } from './pages/factura/factura.component';
import { FacturaDetalleComponent } from './pages/factura-detalle/factura-detalle.component';
import { CobranzasComponent } from './pages/cobranzas/cobranzas.component';
import { CobranzaFormComponent } from './pages/cobranza-form/cobranza-form.component';
import { CobranzaDetalleComponent } from './pages/cobranza-detalle/cobranza-detalle.component';
import { RealizarOCComponent } from './pages/realizar-oc/realizar-oc.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    ClientesComponent,
    ArticulosComponent,
    EmpleadoFormComponent,
    ClienteFormComponent,
    ProveedoresComponent,
    ProveedorFormComponent,
    ArticuloFormComponent,
    VentaComponent,
    FacturaComponent,
    FacturaDetalleComponent,
    CobranzasComponent,
    CobranzaFormComponent,
    CobranzaDetalleComponent,
    RealizarOCComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  exports:[
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
