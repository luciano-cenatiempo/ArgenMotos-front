import { Cliente } from 'src/app/models/Cliente';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2'
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteFormComponent } from 'src/app/cliente-form/cliente-form.component';
import { FacturaService } from 'src/app/services/factura.service';
import { Articulo } from 'src/app/models/Articulo';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FacturaDetalleComponent } from '../factura-detalle/factura-detalle.component';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';
import { OrdenCompra } from 'src/app/models/orden-compra';
import { Factura } from 'src/app/models/factura';
import { OrdenCompraDetalleComponent } from '../orden-compra-detalle/orden-compra-detalle.component';


@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent {
      // nuevo
      columnasTabla: string[] = ['id','fecha','proveedorId','estado','total','acciones'];
      dataInicio : OrdenCompra[] = [];
      dataListaOrdenes = new MatTableDataSource(this.dataInicio);
    
      @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
      constructor(
        public dialog: MatDialog,
        private _facturaService : FacturaService,
        private _utilidadService : UtilidadService,
        private _ordenCompraService : OrdenCompraService
    
      ){}
      
      obtenerOrdenes(){
        this._ordenCompraService.getAll().subscribe({
          next: (data) =>{
            if(data!= null){
              this.dataListaOrdenes.data = data;
            } else {
              this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
            }
          },
          error:(e) => {console.error(e)}
          
        })
      }
    
      // este metodo es para probar la funcionalidad sin base de datos
      // obtenerOrdensMock(){
      //   this.dataListaOrdens.data = ordensLista;
      // }
      
      ngOnInit(): void {
        this.obtenerOrdenes(); // restablecer despues de pruebas
        //this.obtenerOrdensMock(); // borrar despues de pruebas
      }
      
      ngAfterViewInit(): void {
        this.dataListaOrdenes.paginator = this.paginacionTabla;
      }
    
      aplicarFiltroTabla(event: Event){
        const filterValue = (event.target as HTMLInputElement).value
        this.dataListaOrdenes.filter = filterValue.trim().toLocaleLowerCase();
        console.log(this.dataListaOrdenes)
      }
    
      nuevoOrden(){
        this.dialog.open(OrdenCompraDetalleComponent, {
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
          if(resultado == 'true') this.obtenerOrdenes();
        })
      }
    
      editarOrden(orden : OrdenCompra){
        // casteo de clientes tipo
        
        this.dialog.open(OrdenCompraDetalleComponent, {
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
            orden: orden
          }
        }).afterClosed().subscribe(resultado =>{
          if(resultado == 'true') this.obtenerOrdenes();
        })
      }
  
      visualizarOrden(orden : OrdenCompra){
        this.dialog.open(OrdenCompraDetalleComponent, {
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
            orden: orden
          }
        }).afterClosed().subscribe(resultado =>{
          if(resultado == 'true') this.obtenerOrdenes();
        })
      }

      eliminarOrden(ordenCompra: OrdenCompra){
        Swal.fire({
          title: "¿Desea eliminar la orden de compra?",
          text: `${ordenCompra.id}`,
          icon: "warning",
          confirmButtonColor:'#3085d6',
          confirmButtonText:'Si, eliminar',
          showCancelButton: true,
          cancelButtonColor:"#d33",
          cancelButtonText:'Cancelar'
        }).then((resultado)=>{
          if(resultado.isConfirmed){
            this._ordenCompraService.delete(ordenCompra.id).subscribe({
              next: (data) => {
                if(data){
                  this._utilidadService.mostrarAlerta("La orden de compra fue eliminada","Listo!")
                  this.obtenerOrdenes();
    
                } else {
                  this._utilidadService.mostrarAlerta("No se pudo eliminar la orden de compra","Error");
    
                }
              },
              error: (e) =>{
                console.error(e);
              }
            });
          }
        })
      }
    
}
