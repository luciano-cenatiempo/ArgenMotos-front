import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/services/utilidad.service';
import {MatSelectModule} from '@angular/material/select';
import { OtroComprobanteService } from 'src/app/services/otro-comprobante.service';
import { OtroComprobante } from 'src/app/models/otro-comprobante';
import { OtroComprobanteDto } from 'src/app/models/otro-comprobante-dto';
import { OtroComprobanteTipo } from 'src/app/interfaces/OtroComprobanteTipo';
@Component({
  selector: 'app-otros-comprobantes-realizar',
  templateUrl: './otros-comprobantes-realizar.component.html',
  styleUrls: ['./otros-comprobantes-realizar.component.css']
})
export class OtrosComprobantesRealizarComponent implements OnInit{
  formGroup!: FormGroup;
  notBlank: string = "(.|\s)*\S(.|\s)*";
  tituloAccion?: string;
  botonAccion?: string;
  visualizar: boolean = false;

  

  comprobanteTipo: OtroComprobanteTipo[] = [
    {value: 0 , viewValue: 'Nota debito'},
    {value: 1 , viewValue: 'Nota credito'},
  ];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public datosOtroComprobante: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<OtrosComprobantesRealizarComponent>, // para poder manipular la ventana modal
    private fb: FormBuilder,
    private _utilidadService: UtilidadService,
    private _comprobanteService: OtroComprobanteService
    
  ){
    this.formGroup = this.fb.group({
      facturaId: [{value: datosOtroComprobante.factura.id, disabled: true}, [Validators.required]],  
      tipo:[{value: 0 , disabled:false},[Validators.required]], 
      clienteId: [{value: datosOtroComprobante.factura.clienteId, disabled: true}, [Validators.required]],  
      vendedorId: [{value: 1, disabled: true}, [Validators.required]],
      descripcion: [{value: null, disabled: false}, [Validators.required]],
      monto: [{value: null, disabled: false}, [Validators.required]],
      


      
    })
  }

  ngOnInit(): void {

  }

  cancelar(){
    this.dialogRef.close();
  }

  guardarEditar(){
    const comprobante: OtroComprobanteDto ={
      fecha: new Date(),
      facturaId: this.datosOtroComprobante.factura.id,
      clienteId: this.datosOtroComprobante.factura.clienteId,
      vendedorId:1,
      descripcion:this.formGroup.value.descripcion,
      tipo: this.formGroup.value.tipo,
      monto: this.formGroup.value.monto
      // estadoVendedor: parseInt(this.formGroup.value.estadoVendedor)
    }

    if (this.datosOtroComprobante.tipo == 'editar'){
      console.log(comprobante)
      this._comprobanteService.create(comprobante).subscribe({
        next: (data) =>{
          if(data!= null){
            this._utilidadService.mostrarAlerta("El comprobante fue registrado con exito", "Exito");
            this.dialogRef.close("true")
          } else{
            this._utilidadService.mostrarAlerta("No se pudo registrar el comprobante", "Error");
          }
        },
        error:(e) => {console.error(e)}
        
      })
    }
    
  }

  hasErrors(controlName: string, errorType: string){
    return this.formGroup.get(controlName)?.hasError(errorType) && this.formGroup.get(controlName)?.touched
  }

}
