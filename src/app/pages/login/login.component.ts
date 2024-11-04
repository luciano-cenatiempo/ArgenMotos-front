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
}
