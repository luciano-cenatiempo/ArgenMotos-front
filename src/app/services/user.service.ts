import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { Empleado } from '../models/Empleado';
import { EmpleadoFormComponent } from '../pages/empleado-form/empleado-form.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'Auth';
  constructor() { }

  login(user: any): Observable<any> {
    return this.http.post(`${this.UrlBase}/login`, user);
  }
  register(user: any): Observable<any> {
    return this.http.post(`${this.UrlBase}/register`, user);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  } 
  getToken() {
    var token = localStorage.getItem("token");
    return token
  }

  setUsuario(empleado:Empleado){
    localStorage.setItem("usuario", JSON.stringify(empleado));
  }

  getUsuario(): any{
    return localStorage.getItem('usuario')
  }

  getUsuarioLogeado():Empleado{
    var usuarioLoggeado:Empleado
    var usuario = JSON.parse(this.getUsuario())
    usuarioLoggeado = usuario
    return usuarioLoggeado
  }

  isLogged(): boolean{
    return localStorage.getItem('usuario') ? true : false
  }
}
