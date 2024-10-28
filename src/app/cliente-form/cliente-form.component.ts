import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ClienteTipo } from '../interfaces/cliente-tipo';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  formGroup!: FormGroup;
  notBlank: string = "(.|\s)*\S(.|\s)*";
  tituloAccion?: string;
  botonAccion?: string;
  visualizar: boolean = false;

  

  clienteTipo: ClienteTipo[] = [
    {value: 0 , viewValue: 'Regular'},
    {value: 1 , viewValue: 'Mayorista'},
  ];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public datosCliente: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<ClienteFormComponent>, // para poder manipular la ventana modal
    private fb: FormBuilder,
    private _clienteService: ClienteService,
    private _utilidadService: UtilidadService
    
  ){
    this.formGroup = this.fb.group({
      nombre: [{value: null, disabled: false}, [Validators.required, Validators.minLength(3)]],  
      apellido:[{value: null , disabled:false},[Validators.required, Validators.minLength(3)]] ,
      dni:[{value: null , disabled:false},[Validators.required, Validators.minLength(6), Validators.maxLength(8)]], 
      tipo:[{value: 0 , disabled:false},[Validators.required]], 
      telefono:[{value: null, disabled:false},[Validators.required, Validators.minLength(8), Validators.maxLength(11)]] ,
      email:[{value: null, disabled:false},[Validators.required, Validators.email]] ,
      domicilio:[{value: null , disabled:false},[Validators.required]], 
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
    const cliente: Cliente ={
      id: this.datosCliente.cliente == null ? 0 : this.datosCliente.id,
      nombre: this.formGroup.value.nombre,
      apellido: this.formGroup.value.apellido,
      dni: this.formGroup.value.dni,
      tipo: this.formGroup.value.tipo,
      telefono: this.formGroup.value.telefono,
      email: this.formGroup.value.email,
      domicilio: this.formGroup.value.domicilio,
      estado: this.formGroup.value.estado,
      // estadoVendedor: parseInt(this.formGroup.value.estadoVendedor)
    }

    if (this.datosCliente.tipo == 'crear'){
      console.log(cliente)
      this._clienteService.createCliente(cliente).subscribe({
        next: (data) =>{
          if(data!= null){
            this._utilidadService.mostrarAlerta("El cliente fue registrado con exito", "Exito");
            this.dialogRef.close("true")
          } else{
            this._utilidadService.mostrarAlerta("No se pudo registrar el cliente", "Error");
          }
        },
        error:(e) => {console.error(e)}
        
      })
    } else if(this.datosCliente.tipo == 'editar') {
      this._clienteService.updateCliente(this.datosCliente.cliente.id, cliente).subscribe({
        next: (data) =>{
          if(data!= null){
           this._utilidadService.mostrarAlerta("El cliente fue editado con éxito", "Exito");
            this.dialogRef.close("true")
          } else{
           this._utilidadService.mostrarAlerta("No se pudo editar el cliente", "Error");
          }
        },
        error:(e) => {console.error(e)}
        
      })
    }

  }

  initForm(){
    
    
    // si se envia el formulario con datos (editar/visualizar)
    if(this.datosCliente.cliente != null){
      this.formGroup.patchValue({
        nombre: this.datosCliente.cliente.nombre,
        apellido: this.datosCliente.cliente.apellido,
        dni: this.datosCliente.cliente.dni,
        tipo: this.datosCliente.cliente.tipo,
        telefono: this.datosCliente.cliente.telefono,
        email: this.datosCliente.cliente.email,
        domicilio: this.datosCliente.cliente.domicilio,
        estado: this.datosCliente.cliente.estado
  
      })

      if(this.datosCliente.tipo == 'visualizar'){
        this.formGroup.controls['nombre'].disable();
        this.formGroup.controls['apellido'].disable();
        this.formGroup.controls['dni'].disable();
        this.formGroup.controls['tipo'].disable();
        this.formGroup.controls['telefono'].disable();
        this.formGroup.controls['email'].disable();
        this.formGroup.controls['domicilio'].disable();
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
    if(this.datosCliente.tipo == 'crear'){
      this.tituloAccion = 'Crear';
      this.botonAccion = 'Guardar';
      this.visualizar = false;


    } else if(this.datosCliente.tipo == 'editar'){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.visualizar = false;

    } else if(this.datosCliente.tipo == 'visualizar'){
      this.tituloAccion = 'Visualizar';
      this.botonAccion = '';
      this.visualizar = true;
    }


    console.log(this.datosCliente)
  }
}
