import { Cliente } from 'src/app/models/Cliente';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2'
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteFormComponent } from 'src/app/cliente-form/cliente-form.component';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';
import { Articulo } from 'src/app/models/Articulo';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FacturaDetalleComponent } from '../factura-detalle/factura-detalle.component';
import { OtrosComprobantesRealizarComponent } from '../otros-comprobantes-realizar/otros-comprobantes-realizar.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit, AfterViewInit {
    // nuevo
    columnasTabla: string[] = ['id','cliente','vendedor','fecha','total','acciones'];
    dataInicio : Factura[] = [];
    dataListaFacturas = new MatTableDataSource(this.dataInicio);
  
    @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
    constructor(
      public dialog: MatDialog,
      private _facturaService : FacturaService,
      private _clienteService : ClienteService,
      private _empleadoService : EmpleadoService,
      private _utilidadService : UtilidadService
  
    ){}
    
    obtenerFacturas(){
      this._facturaService.getAll().subscribe({
        next: (data) =>{
          if(data!= null){
            this.dataListaFacturas.data = data;
          } else {
            this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
          }
        },
        error:(e) => {console.error(e)}
        
      })
    }
  
    // este metodo es para probar la funcionalidad sin base de datos
    // obtenerFacturasMock(){
    //   this.dataListaFacturas.data = facturasLista;
    // }
    
    ngOnInit(): void {
      this.obtenerFacturas(); // restablecer despues de pruebas
      //this.obtenerFacturasMock(); // borrar despues de pruebas
    }
    
    ngAfterViewInit(): void {
      this.dataListaFacturas.paginator = this.paginacionTabla;
    }
  
    aplicarFiltroTabla(event: Event){
      const filterValue = (event.target as HTMLInputElement).value
      this.dataListaFacturas.filter = filterValue.trim().toLocaleLowerCase();
      console.log(this.dataListaFacturas)
    }
  
    nuevoFactura(){
      this.dialog.open(FacturaDetalleComponent, {
        disableClose:true,
        autoFocus: true,
        closeOnNavigation: false,
        position: {
          top:'30px'
        },
        width: '700px',
        data: {
          // para pasarle todos los tipos de propiedades que queremos usar
          tipo: 'crear',
          cliente: null
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerFacturas();
      })
    }
  
    editarFactura(factura : Factura){
      // casteo de clientes tipo
      console.log(this.dataListaFacturas);  
      console.log(factura);
      this.dialog.open(OtrosComprobantesRealizarComponent, {
        disableClose:true,
        autoFocus: true,
        closeOnNavigation: false,
        position: {
          top:'30px'
        },
        width: '700px',
        data: {
          // para pasarle todos los tipos de propiedades que queremos usar
          tipo: 'editar',
          factura: factura
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerFacturas();
      })
    }

    visualizarFactura(factura : Factura){
      this.dialog.open(FacturaDetalleComponent, {
        disableClose:true,
        autoFocus: false,
        closeOnNavigation: false,
        position: {
          top:'30px'
        },
        width: '700px',
        data: {
          // para pasarle todos los tipos de propiedades que queremos usar
          tipo: 'visualizar',
          factura: factura
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerFacturas();
      })
    }

  
  
    
}
