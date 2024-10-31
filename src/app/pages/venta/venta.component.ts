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

  clienteSeleccionado!: Cliente;

  tipoPago: number = 0;
  totalPagar: number = 0;
  bloquearBoton: boolean = true;
  

  formularioArticuloVenta: FormGroup;
  columnasTabla: string[] = ['cantidad','articulo','precio','total','accion'];
  datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaVenta);



  constructor(
    private fb: FormBuilder,
    private _articuloService:ArticuloService,
    private _FacturaService: FacturaService,
    private _utilidadesService: UtilidadService,
    private _clienteService: ClienteService 
  ){

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


  }

  ngOnInit(): void {
    
  }

  mostrarProducto(articulo: Articulo): any{
    return articulo.descripcion;
  }

  articuloParaVenta(event: any){
    this.articuloSeleccionado = event.option.value;
  }

  clienteParaVenta(event: any){
    this.clienteSeleccionado = event.option.value;
  }

  agregarArticuloParaVenta(){
    const cantidad: number = this.formularioArticuloVenta.value.cantidad;
    const precio: number = this.articuloSeleccionado.precio;
    const total: number = cantidad * precio;
    this.totalPagar  += total;

    this.listaArticulosParaVenta.push({
      articuloId: 0,
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
  }

  registrarFactura(){
    if(this.listaArticulosParaVenta.length > 0){
      this.bloquearBoton = true;
      
    }

    const factura : Factura = {
      id: 0,
      fecha: new Date().toLocaleDateString(),
      precioFinal: this.totalPagar,
      clienteId: this.clienteSeleccionado.id,
      vendedorId: 1,
      articulos: this.listaArticulosParaVenta
    }

    this._FacturaService.create(factura).subscribe({
      next:(data)=>{
        if(data!= null){
          this.totalPagar = 0;
          this.listaArticulosParaVenta = [];
          this.datosDetalleVEnta = new MatTableDataSource(this.listaArticulosParaVenta);

          Swal.fire({
            icon: 'success',
            title: 'Factura realizada',
            text: `Numero de venta: ${data.id}`
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
      },
      error:(e)=>{
        console.error(e);
      }
    });
  }

  mostrarCliente(cliente: Cliente): any{
    return `${cliente.nombre} ${cliente.apellido}`;
  }

  retornarProductosPorFiltro(busqueda:any): Articulo[]{
    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase(): busqueda.descripcion.toLocaleLowerCase();

    return this.listaArticulos.filter(item => item.descripcion.toLocaleLowerCase().includes(valorBuscado))
  }

  retornarClientesPorFiltro(busqueda:any): Cliente[]{
    // var valorBuscado:any;
    // if(typeof busqueda === 'string'){
    //   valorBuscado = busqueda.toLocaleLowerCase();
    // } else{
    //   valorBuscado = busqueda;
    // }
    // var listaFiltrada : Cliente[] = [];
    // this.listaClientes.forEach(cliente => {
    //   console.log(cliente)
    //   if (cliente.nombre.includes(valorBuscado)){
    //     console.log(cliente)
    //     listaFiltrada.push(cliente);
    //   }
    // });

    // console.log(valorBuscado)
    // console.log(listaFiltrada)
    // if(valorBuscado == ''){
    //   return this.listaClientes
    // } else{

    //   return listaFiltrada
    // }

    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase(): busqueda.apellido.toLocaleLowerCase();
    console.log(busqueda)
    return this.listaClientes.filter(item => item.apellido.toLocaleLowerCase().includes(valorBuscado) || item.nombre.toLocaleLowerCase().includes(valorBuscado) || item.dni.toLocaleLowerCase().includes(valorBuscado) )

  }
}
