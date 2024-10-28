import { articulosLista } from './articulos.mocks';
import { Articulo } from 'src/app/models/Articulo';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2'
import { ArticuloService } from 'src/app/services/articulo.service';
import { ArticuloFormComponent } from '../articulo-form/articulo-form.component';
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit, AfterViewInit {
  
    // nuevo
    columnasTabla: string[] = ['id','descripcion','marca','modelo','anno','precio', 'stockActual','stockMinimo', 'stockMaximo', 'acciones'];
    dataInicio : Articulo[] = [];
    dataListaArticulos = new MatTableDataSource(this.dataInicio);
  
    @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
    constructor(
      public dialog: MatDialog,
      private _articuloService : ArticuloService,
      private _utilidadService : UtilidadService
  
    ){}
    
    obtenerArticulos(){
      this._articuloService.getAllArticulos().subscribe({
        next: (data) =>{
          if(data!= null){
            this.dataListaArticulos.data = data;
          } else {
            this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
          }
        },
        error:(e) => {console.error(e)}
        
      })
    }
  
    // este metodo es para probar la funcionalidad sin base de datos
    obtenerArticulosMock(){
      this.dataListaArticulos.data = articulosLista;
    }
    
    ngOnInit(): void {
      //this.obtenerArticulos(); // restablecer despues de pruebas
      this.obtenerArticulosMock(); // borrar despues de pruebas
    }
    
    ngAfterViewInit(): void {
      this.dataListaArticulos.paginator = this.paginacionTabla;
    }
  
    aplicarFiltroTabla(event: Event){
      const filterValue = (event.target as HTMLInputElement).value
      this.dataListaArticulos.filter = filterValue.trim().toLocaleLowerCase();
  
    }
  
    nuevoArticulo(){
      this.dialog.open(ArticuloFormComponent, {
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
          articulo: null
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerArticulos();
      })
    }
  
    editarArticulo(articulo : Articulo){
      this.dialog.open(ArticuloFormComponent, {
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
          articulo: articulo
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerArticulos();
      })
    }

    visualizArticulo(articulo : Articulo){
      this.dialog.open(ArticuloFormComponent, {
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
          articulo: articulo
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerArticulos();
      })
    }
  
  
    eliminarArticulo(articulo: Articulo){
      Swal.fire({
        title: "¿Desea eliminar el articulo?",
        text: `${articulo.descripcion}`,
        icon: "warning",
        confirmButtonColor:'#3085d6',
        confirmButtonText:'Si, eliminar',
        showCancelButton: true,
        cancelButtonColor:"#d33",
        cancelButtonText:'Cancelar'
      }).then((resultado)=>{
        if(resultado.isConfirmed){
          this._articuloService.deleteArticulo(articulo.id).subscribe({
            next: (data) => {
              if(data){
                this._utilidadService.mostrarAlerta("El Articulo fue eliminado","Listo!")
                this.obtenerArticulos();
  
              } else {
                this._utilidadService.mostrarAlerta("No se pudo eliminar el Articulo","Error");
  
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
