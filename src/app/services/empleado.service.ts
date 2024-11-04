import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';
import { Empleado } from '../models/Empleado';
import { Observable } from 'rxjs';
import { EmpleadoDto } from '../models/EmpleadoDto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'vendedor';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}

  
  constructor(
    private _userService:UserService

  ) { }

  getAllEmpleados(): Observable<Empleado[]> {
    const headers = this.headers;

    return this.http.get<Empleado[]>(this.UrlBase,{headers});
  }

  getEmpleadoById(id : number): Observable<Empleado> {
    const headers = this.headers;

    return this.http.get<Empleado>(`${this.UrlBase}/${id}`,{headers});
  }

  createEmpleado(empleado: EmpleadoDto): Observable<Empleado> {
    const headers = this.headers;

    return this.http.post<Empleado>(`${this.UrlBase}`, empleado,{headers});
  }

  updateEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    const headers = this.headers;

    return this.http.put<Empleado>(`${this.UrlBase}/${id}`, empleado,{headers});
  }

  deleteEmpleado(id: number): Observable<Empleado> {
    const headers = this.headers;

    return this.http.delete<Empleado>(`${this.UrlBase}/${id}`,{headers});
  }

  existEmail(email : string): Observable<boolean> {
    const headers = this.headers;

    return this.http.get<boolean>(`${this.UrlBase}/email/${email}`,{headers});
  }



  
  
}
