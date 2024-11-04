import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado, EstadoVendedor } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UserService } from 'src/app/services/user.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  // se pone el signo de exclamacion para indicar que no se va a inicializar en el momento
  formGroup!: FormGroup;
  notBlank: string = "(.|\s)*\S(.|\s)*";
  tituloAccion?: string;
  botonAccion?: string;
  visualizar: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public datosEmpleado: any, // para pasar data desde el componente padre
    public dialogRef: MatDialogRef<EmpleadoFormComponent>, // para poder manipular la ventana modal
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private _utilidadService: UtilidadService,
    private _userService: UserService
    
  ){
    if(datosEmpleado.tipo == 'crear'){
      this.formGroup = this.fb.group({
        nombre: [{value: null, disabled: false}, [Validators.required, Validators.minLength(3)]],  
        apellido:[{value: null , disabled:false},[Validators.required, Validators.minLength(3)]] ,
        dni:[{value: null , disabled:false},[Validators.required, Validators.minLength(6), Validators.maxLength(8)]], 
        telefono:[{value: null, disabled:false},[Validators.required, Validators.minLength(8), Validators.maxLength(11)]] ,
        email:[{value: null, disabled:false},[Validators.required, Validators.email]] ,
        estado:[{value: 0, disabled:false} ],
        password:[{value: null, disabled:false},[Validators.required, Validators.minLength(8)]] ,
      })
    }else{
      this.formGroup = this.fb.group({
        nombre: [{value: null, disabled: false}, [Validators.required, Validators.minLength(3)]],  
        apellido:[{value: null , disabled:false},[Validators.required, Validators.minLength(3)]] ,
        dni:[{value: null , disabled:false},[Validators.required, Validators.minLength(6), Validators.maxLength(8)]], 
        telefono:[{value: null, disabled:false},[Validators.required, Validators.minLength(8), Validators.maxLength(11)]] ,
        email:[{value: null, disabled:true},[Validators.required, Validators.email]] ,
        estado:[{value: 0, disabled:false} ]
      })
    }
    
  }

  ngOnInit(): void {
    this.initForm();
    this.seleccionarTitulo();
  }

  cancelar(){
    this.dialogRef.close();
  }

  guardarEditar(){
    let empleado: Empleado ={
      id: this.datosEmpleado.empleado == null ? 0 : this.datosEmpleado.empleado.Id,
      nombre: this.formGroup.value.nombre,
      apellido: this.formGroup.value.apellido,
      dni: this.formGroup.value.dni,
      telefono: this.formGroup.value.telefono,
      email: this.formGroup.value.email,
      estado: this.formGroup.value.estado,
      // estadoVendedor: parseInt(this.formGroup.value.estadoVendedor)
    }

    if (this.datosEmpleado.tipo == 'crear'){
      this._empleadoService.existEmail(empleado.email).subscribe({
        next: (data) =>{
          if(data == true){
            Swal.fire({
              title: "Error",
              text: "Ya existe un usuario con ese email",
              icon: "error"
            });
            empleado.email = '';
            return
          }else {
            this._empleadoService.createEmpleado(empleado).subscribe({
              next: (data) =>{
                if(data!= null){
                  this._utilidadService.mostrarAlerta("El vendedor fue registrado con exito", "Exito");
                  this._userService.register({emailVendedor:this.formGroup.value.email, password:this.formGroup.value.password}).subscribe({
                    next: (data2) =>{
                      this.dialogRef.close("true")
                    },
                    error:(e) => {
                      console.error(e)
                      this._utilidadService.mostrarAlerta("No se pudo registrar el vendedor", "Error")
                    }
                  
                  })
      
                  
                } else{
                  this._utilidadService.mostrarAlerta("No se pudo registrar el vendedor", "Error");
                }
              },
              error:(e) => {
                console.error(e)
                this._utilidadService.mostrarAlerta("No se pudo registrar el vendedor", "Error")
      
              }
              
            })
          }
        },error:(e)=>{
          console.log(e)
          return
        }
      })
      
      
      
    } else if(this.datosEmpleado.tipo == 'editar') {
      this._empleadoService.updateEmpleado(this.datosEmpleado.empleado.id, empleado).subscribe({
        next: (data) =>{
          if(data!= null){
           this._utilidadService.mostrarAlerta("El vendedor fue editado con éxito", "Exito");
            this.dialogRef.close("true")
          } else{
           this._utilidadService.mostrarAlerta("No se pudo editar el vendedor", "Error");
          }
        },
        error:(e) => {console.error(e)}
        
      })
    }

  }

  initForm(){
    
    

    if(this.datosEmpleado.empleado != null){
      this.formGroup.patchValue({
        nombre: this.datosEmpleado.empleado.nombre,
        apellido: this.datosEmpleado.empleado.apellido,
        dni: this.datosEmpleado.empleado.dni,
        telefono: this.datosEmpleado.empleado.telefono,
        email: this.datosEmpleado.empleado.email,
        estado: this.datosEmpleado.empleado.estado
  
      })

      if(this.datosEmpleado.tipo == 'visualizar'){
        this.formGroup.controls['nombre'].disable();
        this.formGroup.controls['apellido'].disable();
        this.formGroup.controls['dni'].disable();
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
    if(this.datosEmpleado.tipo == 'crear'){
      this.tituloAccion = 'Crear';
      this.botonAccion = 'Guardar';
      this.visualizar = false;


    } else if(this.datosEmpleado.tipo == 'editar'){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.visualizar = false;

    } else if(this.datosEmpleado.tipo == 'visualizar'){
      this.tituloAccion = 'Visualizar';
      this.botonAccion = '';
      this.visualizar = true;
    }

    console.log(this.datosEmpleado)
  }
}
