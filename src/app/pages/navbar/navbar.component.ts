import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/Empleado';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title = 'argenmoto';
  router = inject(Router)
  login:boolean = false
  usuario?:Empleado
  constructor(
    private _userService :UserService
  ){
    this.login = this._userService.isLogged();
  }

  ngOnInit(): void {
    this.usuario = this._userService.getUsuarioLogeado()
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login'])
  }
}
