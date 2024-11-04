import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { ArticuloService } from 'src/app/services/articulo.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Factura } from 'src/app/models/factura';
import { FacturaArticulo } from 'src/app/models/factura-articulo';
import { Articulo } from 'src/app/models/Articulo';
import { FacturaService } from 'src/app/services/factura.service';
import { Cliente } from 'src/app/models/Cliente';
import { clientesLista } from '../clientes/clientes.mocks';
import Swal from 'sweetalert2';
import { filter, Observable, of, switchMap } from 'rxjs';
import { CantidadArticulo } from 'src/app/interfaces/cantidad-articulo';
import { FacturaDto } from 'src/app/models/factura-dto';
import { UserService } from 'src/app/services/user.service';
import { Empleado } from 'src/app/models/Empleado';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit{

  listaArticulos: Articulo[] = [];
  listaArticulosFiltro: Articulo[] = [];

  listaClientes: Cliente[] = [];
  listaClientesFiltro: Cliente[] = [];

  listaArticulosParaVenta: FacturaArticulo[] = [];

  articuloSeleccionado!: Articulo

  cantidadSeleccionada!: CantidadArticulo; 

  clienteSeleccionado!: Cliente;

  listaCantidad:CantidadArticulo[] = [];

  tipoPago: number = 0;
  totalPagar: number = 0;
  bloquearBoton: boolean = false;
  

  formularioArticuloVenta: FormGroup;
  columnasTabla: string[] = ['cantidad','articulo','precio','total','accion'];
  datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaVenta);
  vendedor: Empleado;


  constructor(
    private fb: FormBuilder,
    private _articuloService:ArticuloService,
    private _FacturaService: FacturaService,
    private _utilidadesService: UtilidadService,
    private _clienteService: ClienteService,
    private _userService: UserService
  ){
    this.vendedor = _userService.getUsuarioLogeado();
    // Formulario articulos
    this.formularioArticuloVenta = this.fb.group({
      cliente:[{value: null , disabled:false},[Validators.required]],
      articulo: [{value: null , disabled:false},[Validators.required]],
      cantidad: [{value: null , disabled:false},[Validators.required]],

    });

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


    this.formularioArticuloVenta.get('articulo')?.valueChanges.subscribe(value =>{
      this.listaArticulosFiltro = this.retornarProductosPorFiltro(value);
    })

    


    this._clienteService.getAllClientes().subscribe({
      next:(data)=>{
        if(data!= null){
          const lista = data as Cliente[];
          this.listaClientes = lista; // aca podria aplicar filtros con el filter lista.filter(p=>.esActivo == 1)

        }
      },
      error:(e) =>{
        console.error(e);
      }
    })

    this.formularioArticuloVenta.get('cliente')?.valueChanges.subscribe(value =>{
      this.listaClientesFiltro = this.retornarClientesPorFiltro(value);
    })

    this.formularioArticuloVenta.get('articulo')?.valueChanges.
    subscribe((value) =>{
      this.listaCantidad = [];
      if(value!= null){
        if(value?.stockActual == 0){
           this.listaCantidad.push({value: 0 , text: 'Sin stock'})
        }else{
          for (let i = 1; i <= value.stockActual ; i++) {
            this.listaCantidad.push({value:i, text: i.toString()});
            
          }
        }
      }
      console.log(this.listaCantidad)
      console.log(this.articuloSeleccionado)

      console.log(this.formularioArticuloVenta.get('articulo')?.valid)
      console.log(this.formularioArticuloVenta.get('cantidad')?.valid)
      console.log(this.formularioArticuloVenta.get('cliente')?.valid)
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

  articuloParaVenta(event: any){
    this.articuloSeleccionado = event.option.value;
    
  }
  

  cantidadParaVenta(event: any){
    this.cantidadSeleccionada = event.option.value;
    console.log(this.cantidadSeleccionada)
    
  }

  clienteParaVenta(event: any){
    this.clienteSeleccionado = event.option.value;
  }

  agregarArticuloParaVenta(){
    console.log(this.cantidadSeleccionada)
    const cantidad: number = this.cantidadSeleccionada.value;
    const precio: number = this.articuloSeleccionado.precio;
    const total: number = cantidad * precio;
    this.totalPagar  += total;

    this.formularioArticuloVenta.get('cliente')?.disable(); // desactivo la opcion de seleccionar cliente

    // borramos logicamente la cantidad del articulo


    this.listaArticulosParaVenta.push({
      articuloId: this.articuloSeleccionado.id,
      articulo: this.articuloSeleccionado,
      cantidad: cantidad,
      precioUnitario:precio,
      
    })

    this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaVenta);

    this.formularioArticuloVenta.patchValue({
      articulo:"",
      cantidad: 0
    })
  }

  eliminarArticulo(detalle: FacturaArticulo){
    this.totalPagar = this.totalPagar - (detalle.precioUnitario * detalle.cantidad);
    this.listaArticulosParaVenta = this.listaArticulosParaVenta.filter(a => a.articulo.id != detalle.articulo.id);

    this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaVenta);

    if (this.listaArticulosParaVenta.length == 0){
    this.formularioArticuloVenta.get('cliente')?.enable(); // activo la opcion de seleccionar cliente

    }
  }

  registrarFactura(){
    if(this.listaArticulosParaVenta.length > 0){
      this.bloquearBoton = true;
      
    }

    const factura : FacturaDto = {
      fecha: new Date(),
      clienteId: this.clienteSeleccionado.id,
      vendedorId: this.vendedor.id,
      articulos: this.listaArticulosParaVenta
    }

    console.log(JSON.stringify(factura))

    this._FacturaService.create(factura).subscribe({
      next:(data)=>{
        if(data!= null){
          this.totalPagar = 0;
          this.listaArticulosParaVenta = [];
          this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaVenta);
          Swal.fire({
            icon: 'success',
            title: 'Factura realizada',
            text: `Factura realizada correctamente`
          })
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Se produjo un error',
            text: `No se pudo registrar la factura, intente nuevamente`
          })
        }
      },
      complete:()=>{
        this.bloquearBoton = false;
        this.formularioArticuloVenta.reset();
        this.listaArticulosParaVenta = [];
        this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaVenta);
        this.formularioArticuloVenta.get('cliente')?.enable(); // activo la opcion de seleccionar proveedor
      },
      error:(e)=>{
        console.error(e);
      }
    });
  }

  mostrarCliente(cliente: Cliente): any{
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : '';
  }

  retornarProductosPorFiltro(busqueda:any): Articulo[]{
    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase(): busqueda.descripcion.toLocaleLowerCase();

    return this.listaArticulos.filter(item => item.descripcion.toLocaleLowerCase().includes(valorBuscado))
  }

  retornarClientesPorFiltro(busqueda:any): Cliente[]{

    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase(): busqueda.apellido.toLocaleLowerCase();
    console.log(busqueda)
    return this.listaClientes.filter(item => item.apellido.toLocaleLowerCase().includes(valorBuscado) || item.nombre.toLocaleLowerCase().includes(valorBuscado) || item.dni.toLocaleLowerCase().includes(valorBuscado) )

  }
}
