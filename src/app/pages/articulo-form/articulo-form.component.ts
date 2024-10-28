import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticuloService} from 'src/app/services/articulo.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import {MatSelectModule} from '@angular/material/select';
import { Articulo } from 'src/app/models/Articulo';
@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent {

  formGroup!: FormGroup;
  notBlank: string = "(.|\s)*\S(.|\s)*";
  tituloAccion?: string;
  botonAccion?: string;
  visualizar: boolean = false;

  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public datosArticulo: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<ArticuloFormComponent>, // para poder manipular la ventana modal
    private fb: FormBuilder,
    private _articuloService: ArticuloService,
    private _utilidadService: UtilidadService
    
  ){
    this.formGroup = this.fb.group({
      descripcion: [{value: null, disabled: false}, [Validators.required, Validators.minLength(3),Validators.maxLength(30)]],  
      marca:[{value: null , disabled:false},[Validators.required, Validators.minLength(3),Validators.maxLength(20)]] ,
      modelo:[{value: null , disabled:false},[Validators.required, Validators.minLength(3), Validators.maxLength(20)]], 
      precio:[{value: null , disabled:false},[Validators.required]], 
      anno:[{value: null, disabled:false},[Validators.required, Validators.minLength(4), Validators.maxLength(4)]] ,
      stockActual:[{value: null, disabled:false},[Validators.required]] ,
      stockMinimo:[{value: null , disabled:false},[Validators.required]], 
      stockMaximo:[{value: null, disabled:false},[Validators.required]]   
      
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
    const articulo: Articulo ={
      id: this.datosArticulo.articulo == null ? 0 : this.datosArticulo.id,
      descripcion: this.formGroup.value.descripcion,
      marca: this.formGroup.value.marca,
      modelo: this.formGroup.value.modelo,
      anno: this.formGroup.value.anno,
      precio: this.formGroup.value.precio,
      stockActual: this.formGroup.value.stockActual,
      stockMinimo: this.formGroup.value.stockMinimo,
      stockMaximo: this.formGroup.value.stockMaximo,
      // estadoVendedor: parseInt(this.formGroup.value.estadoVendedor)
    }

    if (this.datosArticulo.tipo == 'crear'){
      console.log(articulo)
      this._articuloService.createArticulo(articulo).subscribe({
        next: (data) =>{
          if(data!= null){
            this._utilidadService.mostrarAlerta("El articulo fue registrado con exito", "Exito");
            this.dialogRef.close("true")
          } else{
            this._utilidadService.mostrarAlerta("No se pudo registrar el articulo", "Error");
          }
        },
        error:(e) => {console.error(e)}
        
      })
    } else if(this.datosArticulo.tipo == 'editar') {
      this._articuloService.updateArticulo(this.datosArticulo.articulo.id, articulo).subscribe({
        next: (data) =>{
          if(data!= null){
           this._utilidadService.mostrarAlerta("El articulo fue editado con éxito", "Exito");
            this.dialogRef.close("true")
          } else{
           this._utilidadService.mostrarAlerta("No se pudo editar el articulo", "Error");
          }
        },
        error:(e) => {console.error(e)}
        
      })
    }

  }

  initForm(){
    
    

    if(this.datosArticulo.articulo != null){
      this.formGroup.patchValue({
        descripcion: this.datosArticulo.articulo.descripcion,
        marca: this.datosArticulo.articulo.marca,
        modelo: this.datosArticulo.articulo.modelo,
        anno: this.datosArticulo.articulo.anno,
        precio: this.datosArticulo.articulo.precio,
        stockActual: this.datosArticulo.articulo.stockActual,
        stockMinimo: this.datosArticulo.articulo.stockMinimo,
        stockMaximo: this.datosArticulo.articulo.stockMaximo
  
      })
      
      if(this.datosArticulo.tipo == 'visualizar'){
        this.formGroup.controls['descripcion'].disable();
        this.formGroup.controls['marca'].disable();
        this.formGroup.controls['modelo'].disable();
        this.formGroup.controls['anno'].disable();
        this.formGroup.controls['precio'].disable();
        this.formGroup.controls['stockMinimo'].disable();
        this.formGroup.controls['stockMaximo'].disable();
        this.formGroup.controls['stockActual'].disable();
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
    if(this.datosArticulo.tipo == 'crear'){
      this.tituloAccion = 'Crear';
      this.botonAccion = 'Guardar';
      this.visualizar = false

    } else if(this.datosArticulo.tipo == 'editar'){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.visualizar= false
    }
    else if(this.datosArticulo.tipo == 'visualizar'){
      this.tituloAccion = 'Visualizar';
      this.botonAccion = '';
      this.visualizar = true;
    }

    console.log(this.datosArticulo)
  }
}
