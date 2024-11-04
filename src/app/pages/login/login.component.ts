import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup!: FormGroup;
  router = inject(Router);
  

  constructor(
    private fb: FormBuilder,
    private _userService: UserService
  ) {
    this.formGroup = this.fb.group({
      email:[{value: null , disabled:false},[Validators.required, Validators.email]], 
      password:[{value: null, disabled:false},[Validators.required]]   
      
    })
  }

  login() {
    const user = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password };

      const emailRegex:RegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      //Se muestra un texto a modo de ejemplo, luego va a ser un icono
      if (!emailRegex.test(user.email)) {
        Swal.fire({
          title: "Error",
          text: "El formato de email es invalido",
          icon: "error"
        });
        return
      } 

      if(!user.password){
        Swal.fire({
          title: "Error",
          text: "Debe ingresar contraseña",
          icon: "error"
        });
        return
      }
    
      
    this._userService.login(user).subscribe({
      next: (data) =>{
        if(data!= null){
          console.log(data)
          this._userService.setToken(data.token);
          this._userService.setUsuario(data.usuario.vendedor);
          this.router.navigate(['home'])
          
        } else {
          console.log(data)
          Swal.fire({
            title: "Error",
            text: "La combinación usuario y contraseña no existen",
            icon: "error"
          });
          
        }
      },
      error:(e) => {
        console.error(e)
        Swal.fire({
          title: "Error",
          text: "La combinación usuario y contraseña no existen",
          icon: "error"
        });
      }
    });

  }

  hasErrors(controlName: string, errorType: string){
    return this.formGroup.get(controlName)?.hasError(errorType) && this.formGroup.get(controlName)?.touched
  }

}
