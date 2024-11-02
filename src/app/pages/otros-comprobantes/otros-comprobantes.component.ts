import { Cliente } from 'src/app/models/Cliente';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2'
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteFormComponent } from 'src/app/cliente-form/cliente-form.component';
import { Articulo } from 'src/app/models/Articulo';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FacturaDetalleComponent } from '../factura-detalle/factura-detalle.component';
import { OtrosComprobantesRealizarComponent } from '../otros-comprobantes-realizar/otros-comprobantes-realizar.component';
import { OtroComprobanteService } from 'src/app/services/otro-comprobante.service';
import { OtroComprobante } from 'src/app/models/otro-comprobante';
import { OtroComprobanteDetalleComponent } from '../otro-comprobante-detalle/otro-comprobante-detalle.component';
@Component({
  selector: 'app-otros-comprobantes',
  templateUrl: './otros-comprobantes.component.html',
  styleUrls: ['./otros-comprobantes.component.css']
})
export class OtrosComprobantesComponent implements OnInit, AfterViewInit {
  // nuevo
  columnasTabla: string[] = ['id','tipo','factura','cliente','vendedor','fecha','descripcion','total','acciones'];
  dataInicio : OtroComprobante[] = [];
  dataListaComprobantes = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private _comprobanteService: OtroComprobanteService,
    private _utilidadService : UtilidadService

  ){}
  
  obtenerComprobantes(){
    this._comprobanteService.getAll().subscribe({
      next: (data) =>{
        if(data!= null){
          this.dataListaComprobantes.data = data;
        } else {
          this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
        }
      },
      error:(e) => {console.error(e)}
      
    })
  }

  // este metodo es para probar la funcionalidad sin base de datos
  // obtenerComprobantesMock(){
  //   this.dataListaComprobantes.data = facturasLista;
  // }
  
  ngOnInit(): void {
    this.obtenerComprobantes(); // restablecer despues de pruebas
    //this.obtenerComprobantesMock(); // borrar despues de pruebas
  }
  
  ngAfterViewInit(): void {
    this.dataListaComprobantes.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataListaComprobantes.filter = filterValue.trim().toLocaleLowerCase();
    console.log(this.dataListaComprobantes)
  }



  visualizarComprobante(comprobante : OtroComprobante){
    this.dialog.open(OtroComprobanteDetalleComponent, {
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
        comprobante: comprobante
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == 'true') this.obtenerComprobantes();
    })
  }



  
}
