import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado, EstadoVendedor } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public datosFactura: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<FacturaDetalleComponent>, // para poder manipular la ventana modal
    private _empleadoService: EmpleadoService,
    private _utilidadService: UtilidadService
    
  ){}


  cerrar(){
    this.dialogRef.close();
  }
}
