import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ArticuloService } from 'src/app/services/articulo.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import {  ProveedorService } from 'src/app/services/proveedor.service';
import { Articulo } from 'src/app/models/Articulo';
import { Cliente } from 'src/app/models/Cliente';
import { clientesLista } from '../clientes/clientes.mocks';
import Swal from 'sweetalert2';
import { filter, Observable, of, switchMap } from 'rxjs';
import { CantidadArticulo } from 'src/app/interfaces/cantidad-articulo';
import { Proveedor } from 'src/app/models/Proveedor';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';
import { OrdenCompraArticulo } from 'src/app/models/orden-compra-articulo';
import { OrdenCompraDTO } from 'src/app/models/orden-compra-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdenEstado } from 'src/app/interfaces/orden-estado';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-orden-compra-form',
  templateUrl: './orden-compra-form.component.html',
  styleUrls: ['./orden-compra-form.component.css']
})
export class OrdenCompraFormComponent {
  listaArticulos: Articulo[] = [];
  listaArticulosFiltro: Articulo[] = [];

  listaProveedores: Proveedor[] = [];
  listaProveedoresFiltro: Proveedor[] = [];

  listaArticulosParaOrden: OrdenCompraArticulo[] = [];

  articuloSeleccionado!: Articulo

  cantidadSeleccionada!: CantidadArticulo; 

  proveedorSeleccionado!: Proveedor;

  listaCantidad:CantidadArticulo[] = [];

  tipoPago: number = 0;
  totalPagar: number = 0;
  bloquearBoton: boolean = false;

  

  formularioArticuloOrden: FormGroup;
  columnasTabla: string[] = ['cantidad','articulo','precio','total','accion'];
  datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaOrden);

  ordenEstado: OrdenEstado[] = [
    {value: 0 , viewValue: 'Pendiente'},
    // {value: 1 , viewValue: 'Aprobada'},
    {value: 2 , viewValue: 'Cancelada'},
    {value: 3 , viewValue: 'Rechazada'},
    {value: 4 , viewValue: 'Completa'},
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public datosOrden: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<OrdenCompraFormComponent>, // para poder manipular la ventana modal
    private fb: FormBuilder,
    private _articuloService:ArticuloService,
    private _utilidadesService: UtilidadService,
    private _proveedorService: ProveedorService,
    private _ordenCompraService: OrdenCompraService,
  ){
    
    // Formulario articulos
    this.formularioArticuloOrden = this.fb.group({
      proveedor:[{value: datosOrden.orden.proveedorId, disabled:true},[Validators.required]],
      articulo: [{value: null , disabled:false},[Validators.required]],
      cantidad: [{value: null , disabled:false},[Validators.required]],
      estado: [{value: datosOrden.orden.estado , disabled:false},[Validators.required]],

    });
    this.listaArticulosParaOrden.push(...datosOrden.orden.articulos)
    this.totalPagar = datosOrden.orden.precioTotal;
    // llena la lista de articulos
    this._articuloService.getAllArticulos().subscribe({
      next:(data)=>{
        if(data!= null){
          const lista = data as Articulo[];
          this.listaArticulos = lista; // aca podria aplicar filtros con el filter lista.filter(p=>.esActivo == 1)

        }
      },
      error:(e) =>{
        console.error(e);
      }
    })


    this.formularioArticuloOrden.get('articulo')?.valueChanges.subscribe(value =>{
      this.listaArticulosFiltro = this.retornarProductosPorFiltro(value);
    })

    


    this._proveedorService.getAllProveedores().subscribe({
      next:(data)=>{
        if(data!= null){
          const lista = data as Proveedor[];
          this.listaProveedores = lista; // aca podria aplicar filtros con el filter lista.filter(p=>.esActivo == 1)

        }
      },
      error:(e) =>{
        console.error(e);
      }
    })

    this.formularioArticuloOrden.get('proveedor')?.valueChanges.subscribe(value =>{
      this.listaProveedoresFiltro = this.retornarProveedoresPorFiltro(value);
    })

    this.formularioArticuloOrden.get('articulo')?.valueChanges.
    subscribe((value) =>{
      this.listaCantidad = [];
      if(value!= null){
        if((value?.stockMaximo - value?.stockActual) == 0){
           this.listaCantidad.push({value: 0 , text: 'Stock completo'})
        }else{
          var maximaPermitida = value.stockMaximo - value.stockActual
          for (let i = 1; i <= maximaPermitida ; i++) {
            this.listaCantidad.push({value:i, text: i.toString()});
            
          }
        }
      }
      console.log(this.listaCantidad)
      console.log(this.articuloSeleccionado)

      console.log(this.formularioArticuloOrden.get('articulo')?.valid)
      console.log(this.formularioArticuloOrden.get('cantidad')?.valid)
      console.log(this.formularioArticuloOrden.get('proveedor')?.valid)
    })

  }

  ngOnInit(): void {
    
  }

  mostrarProducto(articulo: Articulo): any{
    return articulo ?  articulo.descripcion : '';
  }

  mostrarCantidad(cantidad: CantidadArticulo): any{
    return cantidad ? cantidad.text : '';
  }

  articuloParaOrden(event: any){
    this.articuloSeleccionado = event.option.value;
    
  }
  

  cantidadParaOrden(event: any){
    this.cantidadSeleccionada = event.option.value;
    console.log(this.cantidadSeleccionada)
    
  }

  proveedorParaOrden(event: any){
    this.proveedorSeleccionado = event.option.value;
  }

  agregarArticuloParaOrden(){
    console.log(this.cantidadSeleccionada)
    const cantidad: number = this.cantidadSeleccionada.value;
    const precio: number = this.articuloSeleccionado.precioCompra;
    const total: number = cantidad * precio;
    this.totalPagar  += total;

    this.formularioArticuloOrden.get('proveedor')?.disable(); // desactivo la opcion de seleccionar proveedor

    // borramos logicamente la cantidad del articulo


    this.listaArticulosParaOrden.push({
      articuloId: this.articuloSeleccionado.id,
      articulo: this.articuloSeleccionado,
      cantidad: cantidad,
      precioUnitario:precio,
      
    })

    this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaOrden);

    this.formularioArticuloOrden.patchValue({
      articulo:"",
      cantidad: 0
    })
  }

  eliminarArticulo(detalle: OrdenCompraArticulo){
    this.totalPagar = this.totalPagar - (detalle.precioUnitario * detalle.cantidad);
    this.listaArticulosParaOrden = this.listaArticulosParaOrden.filter(a => a.articulo.id != detalle.articulo.id);

    this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaOrden);

  }

  registrarOrden(){
    if(this.listaArticulosParaOrden.length > 0){
      this.bloquearBoton = true;
      
    }

    const ordenCompra : OrdenCompraDTO = {
      fecha: new Date(),
      proveedorId: this.proveedorSeleccionado.id,
      estado: this.formularioArticuloOrden.value.estado,
      articulos: this.listaArticulosParaOrden
    }

    console.log(JSON.stringify(ordenCompra))

    this._ordenCompraService.create(ordenCompra).subscribe({
      next:(data)=>{
        if(data!= null){
          this.totalPagar = 0;
          this.listaArticulosParaOrden = [];
          this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaOrden);

          Swal.fire({
            icon: 'success',
            title: 'Orden de compra realizada',
            text: `Numero de Orden: ${data.id}`
          })
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Se produjo un error',
            text: `No se pudo actualizar la orden de Compra, intente nuevamente`
          })
        }
      },
      complete:()=>{
        this.bloquearBoton = false;
        this.formularioArticuloOrden.reset();
        this.listaArticulosParaOrden = [];
        this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaOrden);
        this.formularioArticuloOrden.get('proveedor')?.enable(); // activo la opcion de seleccionar proveedor
      },
      error:(e)=>{
        console.error(e);
      }
    });
  }

  actualizarOrden(){
    if(this.listaArticulosParaOrden.length > 0){
      this.bloquearBoton = true;
      
    }

    const ordenCompra : OrdenCompraDTO = {
      fecha: new Date(),
      proveedorId: this.datosOrden.orden.proveedorId,
      estado: this.formularioArticuloOrden.value.estado,
      articulos: this.listaArticulosParaOrden
    }

    console.log(JSON.stringify(ordenCompra))

    this._ordenCompraService.update(this.datosOrden.orden.id, ordenCompra).subscribe({
      next:(data)=>{
        if(data!= null){

          Swal.fire({
            icon: 'success',
            title: 'Orden de compra realizada',
            text: `Numero de Orden: ${data.id}`
          })

          this.totalPagar = 0;
          this.listaArticulosParaOrden = [];
          this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaOrden);
          this.dialogRef.close("true");
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Se produjo un error',
            text: `No se pudo actualizar la orden de Compra, intente nuevamente`
          })
        }
      },
      complete:()=>{
        this.bloquearBoton = false;
        this.formularioArticuloOrden.reset();
        this.listaArticulosParaOrden = [];
        this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaOrden);
        this.formularioArticuloOrden.get('proveedor')?.enable(); // activo la opcion de seleccionar proveedor
      },
      error:(e)=>{
        console.error(e);
      }
    });
  }

  mostrarProveedor(proveedor: Proveedor): any{
    return proveedor ? `${proveedor.nombre}` : '';
  }

  retornarProductosPorFiltro(busqueda:any): Articulo[]{
    const valorBuscado = typeof busqueda === 'string' ? busqueda: busqueda.descripcion;

    return this.listaArticulos.filter(item => item.descripcion.toLocaleLowerCase().includes(valorBuscado))
  }

  retornarProveedoresPorFiltro(busqueda:any): Proveedor[]{

    const valorBuscado = typeof busqueda === 'string' ? busqueda: busqueda.nombre;
    console.log(busqueda)
    return this.listaProveedores.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado))

  }

  cancelar(){
    this.dialogRef.close();
  }
}
