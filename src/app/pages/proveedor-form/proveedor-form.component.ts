import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from 'src/app/models/Proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css']
})
export class ProveedorFormComponent implements OnInit{

    // se pone el signo de exclamacion para indicar que no se va a inicializar en el momento
    formGroup!: FormGroup;
    cuilRegex: string =  "^\(\d{2}-\d{8}-\d{1}\)$";
    tituloAccion?: string;
    botonAccion?: string;
    visualizar: boolean = false;
    
    constructor(
      @Inject(MAT_DIALOG_DATA) public datosProveedor: any, // para pasar data desde el componente padre
      public dialogRef: MatDialogRef<ProveedorFormComponent>, // para poder manipular la ventana modal
      private fb: FormBuilder,
      private _proveedorService: ProveedorService,
      private _utilidadService: UtilidadService
      
    ){
      this.formGroup = this.fb.group({
        razonSocial: [{value: null, disabled: false}, [Validators.required, Validators.minLength(3)]],  
        nombre: [{value: null, disabled: false}, [Validators.required, Validators.minLength(3)]],  
        cuil:[{value: null , disabled:false},[Validators.required, Validators.maxLength(13), Validators.minLength(13)]], 
        domicilio: [{value: null, disabled: false}, [Validators.required, Validators.minLength(3)]],  
        telefono:[{value: null, disabled:false},[Validators.required, Validators.minLength(8), Validators.maxLength(11)]] ,
        email:[{value: null, disabled:false},[Validators.required, Validators.email]] ,
        estado:[{value: 0, disabled:false} ]   
        
      })
    }
  
    ngOnInit(): void {
      this.initForm();
      this.seleccionarTitulo();
    }
  
    cancelar(){
      this.dialogRef.close();
    }
  
    guardarEditar(){
      const proveedor: Proveedor ={
        id: this.datosProveedor.proveedor == null ? 0 : this.datosProveedor.id,
        razonSocial: this.formGroup.value.razonSocial,
        nombre: this.formGroup.value.nombre,
        cuil: this.formGroup.value.cuil,
        domicilio: this.formGroup.value.domicilio,
        telefono: this.formGroup.value.telefono,
        email: this.formGroup.value.email,
        estado: this.formGroup.value.estado,
        // estadoVendedor: parseInt(this.formGroup.value.estadoVendedor)
      }
  
      if (this.datosProveedor.tipo == 'crear'){
        console.log(proveedor)
        this._proveedorService.createProveedor(proveedor).subscribe({
          next: (data) =>{
            if(data!= null){
              this._utilidadService.mostrarAlerta("El proveedor fue registrado con exito", "Exito");
              this.dialogRef.close("true")
            } else{
              this._utilidadService.mostrarAlerta("No se pudo registrar el proveedor", "Error");
            }
          },
          error:(e) => {console.error(e)}
          
        })
      } else if(this.datosProveedor.tipo == 'editar') {
        console.log(proveedor);
        this._proveedorService.updateProveedor(this.datosProveedor.proveedor.id, proveedor).subscribe({
          next: (data) =>{
            if(data!= null){
             this._utilidadService.mostrarAlerta("El proveedor fue editado con éxito", "Exito");
              this.dialogRef.close("true")
            } else{
             this._utilidadService.mostrarAlerta("No se pudo editar el proveedor", "Error");
            }
          },
          error:(e) => {console.error(e)}
          
        })
      }
  
    }
  
    initForm(){
      
      
  
      if(this.datosProveedor.proveedor != null){
        this.formGroup.patchValue({
          razonSocial: this.datosProveedor.proveedor.razonSocial,
          nombre: this.datosProveedor.proveedor.nombre,
          cuil: this.datosProveedor.proveedor.cuil,
          domicilio: this.datosProveedor.proveedor.domicilio,
          telefono: this.datosProveedor.proveedor.telefono,
          email: this.datosProveedor.proveedor.email,
          estado: this.datosProveedor.proveedor.estado
    
        })

        if(this.datosProveedor.tipo == 'visualizar'){
          this.formGroup.controls['razonSocial'].disable();
          this.formGroup.controls['nombre'].disable();
          this.formGroup.controls['cuil'].disable();
          this.formGroup.controls['domicilio'].disable();
          this.formGroup.controls['telefono'].disable();
          this.formGroup.controls['email'].disable();
          this.formGroup.controls['estado'].disable();
        }
      }
      
    }
  
    hasErrors(controlName: string, errorType: string){
      return this.formGroup.get(controlName)?.hasError(errorType) && this.formGroup.get(controlName)?.touched
    }
  
    onSubmit(){
      console.log(this.formGroup.value);
    }
  
    seleccionarTitulo(){
      if(this.datosProveedor.tipo == 'crear'){
        this.tituloAccion = 'Crear';
        this.botonAccion = 'Guardar';
  
      } else if(this.datosProveedor.tipo == 'editar'){
        this.tituloAccion = 'Editar';
        this.botonAccion = 'Actualizar';
      }else if(this.datosProveedor.tipo == 'visualizar'){
        this.tituloAccion = 'Visualizar';
        this.botonAccion = '';
        this.visualizar = true;
      }
  
      console.log(this.datosProveedor)
    }
}
