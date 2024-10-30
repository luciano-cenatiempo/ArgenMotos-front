import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2'
import { Proveedor } from 'src/app/models/Proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { proveedoresLista } from './proveedores.mocks';
import { ProveedorFormComponent } from '../proveedor-form/proveedor-form.component';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit, AfterViewInit{

  columnasTabla: string[] = ['id','razonSocial','nombre','cuil','domicilio','telefono', 'email','estado', 'acciones'];
  dataInicio : Proveedor[] = [];
  dataListaProveedores = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private _proveedorService : ProveedorService,
    private _utilidadService : UtilidadService

  ){}
  
  obtenerProveedores(){
    this._proveedorService.getAllProveedores().subscribe({
      next: (data) =>{
        if(data!= null){
          this.dataListaProveedores.data = data;
        } else {
          this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
        }
      },
      error:(e) => {console.error(e)}
      
    })
  }

  // este metodo es para probar la funcionalidad sin base de datos
  obtenerProveedoresMock(){
    this.dataListaProveedores.data = proveedoresLista;
  }
  
  ngOnInit(): void {
    this.obtenerProveedores(); // restablecer despues de pruebas
    //this.obtenerProveedoresMock(); // borrar despues de pruebas
  }
  
  ngAfterViewInit(): void {
    this.dataListaProveedores.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataListaProveedores.filter = filterValue.trim().toLocaleLowerCase();

  }

  nuevoProveedor(){
    this.dialog.open(ProveedorFormComponent, {
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
        proveedor: null
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == 'true') this.obtenerProveedores();
    })
  }

  editarProveedor(proveedor : Proveedor){
    this.dialog.open(ProveedorFormComponent, {
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
        proveedor: proveedor
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == 'true') this.obtenerProveedores();
    })
  }

  visualizProveedor(proveedor : Proveedor){
    this.dialog.open(ProveedorFormComponent, {
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
        proveedor: proveedor
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == 'true') this.obtenerProveedores();
    })
  }


  eliminarProveedor(proveedor: Proveedor){
    Swal.fire({
      title: "¿Desea eliminar el proveedor?",
      text: `${proveedor.nombre}`,
      icon: "warning",
      confirmButtonColor:'#3085d6',
      confirmButtonText:'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor:"#d33",
      cancelButtonText:'Cancelar'
    }).then((resultado)=>{
      if(resultado.isConfirmed){
        this._proveedorService.deleteProveedor(proveedor.id).subscribe({
          next: (data) => {
            if(data){
              this._utilidadService.mostrarAlerta("El Proveedor fue eliminado","Listo!")
              this.obtenerProveedores();

            } else {
              this._utilidadService.mostrarAlerta("No se pudo eliminar el Proveedor","Error");

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
