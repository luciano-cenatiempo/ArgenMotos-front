import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/Cliente';
import { Empleado, EstadoVendedor } from 'src/app/models/Empleado';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent {

  cliente?:Cliente;
  mostrarDatosCLiente: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public datosFactura: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<FacturaDetalleComponent>, // para poder manipular la ventana modal
    private _empleadoService: EmpleadoService,
    private _utilidadService: UtilidadService,
    private _clienteService: ClienteService,
    
    
  ){
    this.buscarCliente();
  }


  cerrar(){
    this.dialogRef.close();
  }

  buscarCliente(){
    this._clienteService.getClienteById(this.datosFactura.factura.clienteId).subscribe({
      next: (data) =>{
        if(data!= null){
          this.cliente = data;
          this.mostrarDatosCLiente = true;
        } else {
          this.mostrarDatosCLiente = false;
          
        }
      },
      error:(e) => {
        console.error(e)
        this.mostrarDatosCLiente = false;
        
      }

    })
  }
}
