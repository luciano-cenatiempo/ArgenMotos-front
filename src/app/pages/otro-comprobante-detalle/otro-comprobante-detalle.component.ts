import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/Cliente';
import { Empleado, EstadoVendedor } from 'src/app/models/Empleado';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-otro-comprobante-detalle',
  templateUrl: './otro-comprobante-detalle.component.html',
  styleUrls: ['./otro-comprobante-detalle.component.css']
})
export class OtroComprobanteDetalleComponent {
  
  public tipoComprobante?: string;
  cliente?:Cliente;
  mostrarDatosCLiente: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public datosComprobante: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<OtroComprobanteDetalleComponent>, // para poder manipular la ventana modal
    private _empleadoService: EmpleadoService,
    private _utilidadService: UtilidadService,
    private _clienteService: ClienteService,
    
    
  ){
    this.transformarTipoComprobante();
    this.buscarCliente();
  }


  cerrar(){
    this.dialogRef.close();
  }

  transformarTipoComprobante(){
    if(this.datosComprobante.comprobante.tipo = 0){
      this.tipoComprobante = 'Nota de Debito'
    }else{
      this.tipoComprobante = 'Nota de Credito'

    }
  }

  buscarCliente(){
    this._clienteService.getClienteById(this.datosComprobante.comprobante.clienteId).subscribe({
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
