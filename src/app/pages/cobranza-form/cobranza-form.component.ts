import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetodoPago } from 'src/app/interfaces/metodo-pago';
import { Cobranza } from 'src/app/models/cobranza';
import { CobranzaDto } from 'src/app/models/cobranza-dto';
import { Factura } from 'src/app/models/factura';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { FacturaService } from 'src/app/services/factura.service';
import { UserService } from 'src/app/services/user.service';
import { UtilidadService } from 'src/app/services/utilidad.service';


@Component({
  selector: 'app-cobranza-form',
  templateUrl: './cobranza-form.component.html',
  styleUrls: ['./cobranza-form.component.css']
})
export class CobranzaFormComponent {
   // se pone el signo de exclamacion para indicar que no se va a inicializar en el momento
   formGroup!: FormGroup;
   notBlank: string = "(.|\s)*\S(.|\s)*";
   tituloAccion?: string;
   botonAccion?: string;
   visualizar: boolean = false;

  listaFacturas: Factura[] = [];

  listaFacturasFiltro: Factura[] = [];

  facturaSeleccionada!: Factura;


   metodoPago: MetodoPago[] = [
    {value: 0 , viewValue: 'QR'},
    {value: 1 , viewValue: 'Tarjeta Debito'},
    {value: 2 , viewValue: 'Tarjeta Credito'},
    {value: 3 , viewValue: 'Mercado Pago'},
    {value: 4 , viewValue: 'Efectivo'},
   ]
   
   
   constructor(
     @Inject(MAT_DIALOG_DATA) public datosCobranza: any, // para pasar data desde el componente padre
     public dialogRef: MatDialogRef<CobranzaFormComponent>, // para poder manipular la ventana modal
     private fb: FormBuilder,
     private _cobranzaService: CobranzaService,
     private _facturaService: FacturaService,
     private _utilidadService: UtilidadService,
     
     
   ){
     this.formGroup = this.fb.group({
       factura: [{value: null, disabled: false}, [Validators.required]],  
       metodoPago:[{value: null , disabled:false},[Validators.required]] ,       
     })


     this.formGroup.get('factura')?.valueChanges.subscribe(value =>{
      this.listaFacturasFiltro = this.retornarFacturasPorFiltro(value);
    })

    // llena la lista de facturas
    this._facturaService.getAll().subscribe({
      next:(data)=>{
        if(data!= null){
          const lista = data as Factura[];
          this.listaFacturas = lista; // aca podria aplicar filtros con el filter lista.filter(p=>.esActivo == 1)

        }
      },
      error:(e) =>{
        console.error(e);
      }
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
     const cobranza: CobranzaDto ={
       facturaId:  this.facturaSeleccionada.id,
       metodoPago: this.formGroup.value.metodoPago,
       fechaCobranza: new Date()
     }
     console.log(JSON.stringify(cobranza))
     if (this.datosCobranza.tipo == 'crear'){
       
       this._cobranzaService.createCobranza(cobranza).subscribe({
         next: (data) =>{
           if(data!= null){
             this._utilidadService.mostrarAlerta("El cobro fue registrado con exito", "Exito");
             this.dialogRef.close("true")
           } else{
             this._utilidadService.mostrarAlerta("No se pudo registrar el cobro", "Error");
           }
         },
         error:(e) => {console.error(e)}
         
       })
     } else if(this.datosCobranza.tipo == 'editar') {
       console.log(cobranza)
       this._cobranzaService.updateCobranza(this.datosCobranza.cobranza.id, cobranza).subscribe({
         next: (data) =>{
           if(data!= null){
            this._utilidadService.mostrarAlerta("El cobro fue editado con éxito", "Exito");
             this.dialogRef.close("true")
           } else{
            this._utilidadService.mostrarAlerta("No se pudo editar el cobro", "Error");
           }
         },
         error:(e) => {
          console.error(e)
          this._utilidadService.mostrarAlerta("No se pudo editar el cobro", "Error");
         }
       })
     }
 
   }
 
   initForm(){
     
     
 
     if(this.datosCobranza.cobranza != null){
      console.log(this.datosCobranza.factura)
       this.formGroup.patchValue({
         factura: this.datosCobranza.cobranza.facturaId,
         metodoPago: this.datosCobranza.cobranza.metodoPago,
         fechaCobranza: new Date(),
         
       })
       
 
     }
     
   }

   retornarFacturasPorFiltro(busqueda:any): Factura[]{
    const valorBuscado = typeof busqueda === 'string' ? busqueda.toLocaleLowerCase(): busqueda.id;

    return this.listaFacturas.filter(item => item.id.toString().includes(valorBuscado))
  }
 
   hasErrors(controlName: string, errorType: string){
     return this.formGroup.get(controlName)?.hasError(errorType) && this.formGroup.get(controlName)?.touched
   }
 
   onSubmit(){
     console.log(this.formGroup.value);
   }
 
   seleccionarTitulo(){
     if(this.datosCobranza.tipo == 'crear'){
       this.tituloAccion = 'Crear';
       this.botonAccion = 'Guardar';
       this.visualizar = false;
 
 
     } else if(this.datosCobranza.tipo == 'editar'){
       this.tituloAccion = 'Editar';
       this.botonAccion = 'Actualizar';
       this.visualizar = false;
 
     } else if(this.datosCobranza.tipo == 'visualizar'){
       this.tituloAccion = 'Visualizar';
       this.botonAccion = '';
       this.visualizar = true;
     }
 
     console.log(this.datosCobranza)
}

facturaParaCobranza(event: any){
  this.facturaSeleccionada = event.option.value;
  
}

mostrarFactura(factura: Factura): any{
  return factura ?  factura.id : '';
}
}
