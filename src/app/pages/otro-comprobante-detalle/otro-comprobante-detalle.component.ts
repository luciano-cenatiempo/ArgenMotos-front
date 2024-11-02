import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public datosComprobante: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<OtroComprobanteDetalleComponent>, // para poder manipular la ventana modal
    private _empleadoService: EmpleadoService,
    private _utilidadService: UtilidadService,
    private _clienteService: ClienteService,
    
    
  ){
    this.transformarTipoComprobante();
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
}
