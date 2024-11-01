import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado, EstadoVendedor } from 'src/app/models/Empleado';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-orden-compra-detalle',
  templateUrl: './orden-compra-detalle.component.html',
  styleUrls: ['./orden-compra-detalle.component.css']
})
export class OrdenCompraDetalleComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public datosOrden: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<OrdenCompraDetalleComponent>, // para poder manipular la ventana modal
    private _utilidadService: UtilidadService,
    
    
  ){}


  cerrar(){
    this.dialogRef.close();
  }
}
