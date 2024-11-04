import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { empleadosLista } from './empleados.mocks';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpleadoFormComponent } from '../empleado-form/empleado-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { Empleado } from 'src/app/models/Empleado';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit, AfterViewInit{
  
  empleados: Empleado[] = empleadosLista;

  // nuevo
  columnasTabla: string[] = ['id','nombre','apellido','dni','telefono', 'email', 'estado', 'acciones'];
  dataInicio : Empleado[] = [];
  dataListaEmpleados = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private _empleadoService : EmpleadoService,
    private _utilidadService : UtilidadService,
    private _userService : UserService

  ){}
  
  obtenerEmpleados(){
    this._empleadoService.getAllEmpleados().subscribe({
      next: (data) =>{
        if(data!= null){
          this.dataListaEmpleados.data = data;
        } else {
          this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
        }
      },
      error:(e) => {console.error(e)}
      
    })
  }

  // este metodo es para probar la funcionalidad sin base de datos
  obtenerEmpleadosMock(){
    this.dataListaEmpleados.data = empleadosLista;
  }
  
  ngOnInit(): void {
    this.obtenerEmpleados(); // restablecer despues de pruebas
    // this.obtenerEmpleadosMock(); // borrar despues de pruebas
  }
  
  ngAfterViewInit(): void {
    this.dataListaEmpleados.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataListaEmpleados.filter = filterValue.trim().toLocaleLowerCase();

  }

  nuevoEmpleado(){
    this.dialog.open(EmpleadoFormComponent, {
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
        empleado: null
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == 'true') this.obtenerEmpleados();
    })
  }

  editarEmpleado(empleado : Empleado){
    this.dialog.open(EmpleadoFormComponent, {
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
        empleado: empleado
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == 'true') this.obtenerEmpleados();
    })
  }

  visualizarEmpleado(empleado : Empleado){
    this.dialog.open(EmpleadoFormComponent, {
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
        empleado: empleado
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == 'true') this.obtenerEmpleados();
    })
  }


  eliminarEmpleado(empleado: Empleado){
    if(empleado.id == this._userService.getUsuarioLogeado().id){
      Swal.fire({
        title:"Error",
        text: "No se puede eliminar a usted mismo",
        icon:"error"
      })
    }else{

    
    Swal.fire({
      title: "¿Desea eliminar el vendedor?",
      text: `${empleado.nombre} ${empleado.apellido}`,
      icon: "warning",
      confirmButtonColor:'#3085d6',
      confirmButtonText:'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor:"#d33",
      cancelButtonText:'Cancelar'
    }).then((resultado)=>{
        if(resultado.isConfirmed){
          this._empleadoService.deleteEmpleado(empleado.id).subscribe({
            next: (data) => {
              if(data){
                this._utilidadService.mostrarAlerta("El empleado fue eliminado","Listo!")
                this.obtenerEmpleados();

              } else {
                this._utilidadService.mostrarAlerta("No se pudo eliminar el empleado","Error");

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




}
