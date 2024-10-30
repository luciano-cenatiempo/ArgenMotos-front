import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';
import { Empleado } from '../models/Empleado';
import { Observable } from 'rxjs';
import { EmpleadoDto } from '../models/EmpleadoDto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'vendedor';
  
  constructor() { }

  getAllEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.UrlBase);
  }

  getEmpleadoById(id : number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.UrlBase}/${id}`);
  }

  createEmpleado(empleado: EmpleadoDto): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.UrlBase}`, empleado);
  }

  updateEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.UrlBase}/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.UrlBase}/${id}`);
  }



  
  
}
