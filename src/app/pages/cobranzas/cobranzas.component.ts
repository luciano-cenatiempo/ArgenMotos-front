import { Articulo } from 'src/app/models/Articulo';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2'
import { CobranzaService } from 'src/app/services/cobranza.service';
import { CobranzaFormComponent } from '../cobranza-form/cobranza-form.component';
import { CobranzaDto } from 'src/app/models/cobranza-dto';
import { Cobranza } from 'src/app/models/cobranza';
import { MetodoPago } from 'src/app/interfaces/metodo-pago';
import { CobranzaDetalleComponent } from '../cobranza-detalle/cobranza-detalle.component';

@Component({
  selector: 'app-cobranzas',
  templateUrl: './cobranzas.component.html',
  styleUrls: ['./cobranzas.component.css']
})
export class CobranzasComponent implements OnInit, AfterViewInit {
   // nuevo
   columnasTabla: string[] = ['id','fecha','facturaId','metodoPago','total', 'acciones'];
   dataInicio : Cobranza[] = [];

   
   
   dataListaCobranzas = new MatTableDataSource(this.dataInicio);
 
   @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
   constructor(
     
     public dialog: MatDialog,
     private _cobranzaService : CobranzaService,
     private _utilidadService : UtilidadService
 
   ){}
   
   obtenerCobranzas(){
     this._cobranzaService.getAllCobranzas().subscribe({
       next: (data) =>{
         if(data!= null){
           this.dataListaCobranzas.data = data;
         } else {
           this._utilidadService.mostrarAlerta('No se encontraron datos', 'Oops!')
         }
       },
       error:(e) => {console.error(e)}
       
     })
     
   }
 
   // este metodo es para probar la funcionalidad sin base de datos
  //  obtenerCobranzasMock(){
  //    this.dataListaCobranzas.data = cobranzasLista;
     
  //  }
   
   ngOnInit(): void {
     this.obtenerCobranzas(); // restablecer despues de pruebas
     //this.obtenerCobranzasMock(); // borrar despues de pruebas
   }
   
   ngAfterViewInit(): void {
     this.dataListaCobranzas.paginator = this.paginacionTabla;
   }
 
   aplicarFiltroTabla(event: Event){
     const filterValue = (event.target as HTMLInputElement).value
     this.dataListaCobranzas.filter = filterValue.trim().toLocaleLowerCase();
 
   }
 
   nuevoCobranza(){
     this.dialog.open(CobranzaFormComponent, {
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
         cobranza: null
       }
     }).afterClosed().subscribe(resultado =>{
       if(resultado == 'true') this.obtenerCobranzas();
     })
   }
 
   editarCobranza(cobranza : Cobranza){
     this.dialog.open(CobranzaFormComponent, {
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
         cobranza: cobranza
       }
     }).afterClosed().subscribe(resultado =>{
       if(resultado == 'true') this.obtenerCobranzas();
     })
   }

   visualizCobranza(cobranza : Cobranza){
     this.dialog.open(CobranzaDetalleComponent, {
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
         cobranza: cobranza
       }
     }).afterClosed().subscribe(resultado =>{
       if(resultado == 'true') this.obtenerCobranzas();
     })
   }
 
 
   eliminarCobranza(cobranza: Cobranza){
     Swal.fire({
       title: "¿Desea eliminar el cobranza?",
       text: `${cobranza.id}`,
       icon: "warning",
       confirmButtonColor:'#3085d6',
       confirmButtonText:'Si, eliminar',
       showCancelButton: true,
       cancelButtonColor:"#d33",
       cancelButtonText:'Cancelar'
     }).then((resultado)=>{
       if(resultado.isConfirmed){
         this._cobranzaService.deleteCobranza(cobranza.id).subscribe({
           next: (data) => {
             if(data){
               this._utilidadService.mostrarAlerta("El cobro fue eliminado","Listo!")
               this.obtenerCobranzas();
 
             } else {
               this._utilidadService.mostrarAlerta("No se pudo eliminar el Cobro","Error");
 
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
