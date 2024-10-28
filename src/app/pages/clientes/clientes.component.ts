import { clientesLista } from './clientes.mocks';
import { Cliente } from 'src/app/models/Cliente';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2'
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteFormComponent } from 'src/app/cliente-form/cliente-form.component';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

    // nuevo
    columnasTabla: string[] = ['id','nombre','apellido','dni','tipo','telefono', 'email','domicilio', 'estado', 'acciones'];
    dataInicio : Cliente[] = [];
    dataListaClientes = new MatTableDataSource(this.dataInicio);
  
    @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
    constructor(
      public dialog: MatDialog,
      private _clienteService : ClienteService,
      private _utilidadService : UtilidadService
  
    ){}
    
    obtenerClientes(){
      this._clienteService.getAllClientes().subscribe({
        next: (data) =>{
          if(data!= null){
            this.dataListaClientes.data = data;
          } else {
            this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
          }
        },
        error:(e) => {console.error(e)}
        
      })
    }
  
    // este metodo es para probar la funcionalidad sin base de datos
    obtenerClientesMock(){
      this.dataListaClientes.data = clientesLista;
    }
    
    ngOnInit(): void {
      //this.obtenerClientes(); // restablecer despues de pruebas
      this.obtenerClientesMock(); // borrar despues de pruebas
    }
    
    ngAfterViewInit(): void {
      this.dataListaClientes.paginator = this.paginacionTabla;
    }
  
    aplicarFiltroTabla(event: Event){
      const filterValue = (event.target as HTMLInputElement).value
      this.dataListaClientes.filter = filterValue.trim().toLocaleLowerCase();
      console.log(this.dataListaClientes)
    }
  
    nuevoCliente(){
      this.dialog.open(ClienteFormComponent, {
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
        if(resultado == 'true') this.obtenerClientes();
      })
    }
  
    editarCliente(cliente : Cliente){
      this.dialog.open(ClienteFormComponent, {
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
          cliente: cliente
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerClientes();
      })
    }

    visualizarCliente(cliente : Cliente){
      this.dialog.open(ClienteFormComponent, {
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
          cliente: cliente
        }
      }).afterClosed().subscribe(resultado =>{
        if(resultado == 'true') this.obtenerClientes();
      })
    }
  
  
    eliminarCliente(cliente: Cliente){
      Swal.fire({
        title: "¿Desea eliminar el cliente?",
        text: `${cliente.nombre} ${cliente.apellido}`,
        icon: "warning",
        confirmButtonColor:'#3085d6',
        confirmButtonText:'Si, eliminar',
        showCancelButton: true,
        cancelButtonColor:"#d33",
        cancelButtonText:'Cancelar'
      }).then((resultado)=>{
        if(resultado.isConfirmed){
          this._clienteService.deleteCliente(cliente.id).subscribe({
            next: (data) => {
              if(data){
                this._utilidadService.mostrarAlerta("El Cliente fue eliminado","Listo!")
                this.obtenerClientes();
  
              } else {
                this._utilidadService.mostrarAlerta("No se pudo eliminar el Cliente","Error");
  
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
