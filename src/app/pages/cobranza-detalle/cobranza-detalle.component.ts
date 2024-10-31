import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado, EstadoVendedor } from 'src/app/models/Empleado';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-cobranza-detalle',
  templateUrl: './cobranza-detalle.component.html',
  styleUrls: ['./cobranza-detalle.component.css']
})
export class CobranzaDetalleComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public datosCobranza: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<CobranzaDetalleComponent>, // para poder manipular la ventana modal
    
    
    
  ){}


  cerrar(){
    this.dialogRef.close();
  }
}
