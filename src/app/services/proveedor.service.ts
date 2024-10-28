import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';

import { Observable } from 'rxjs';
import { Proveedor } from '../models/Proveedor';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService { 

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'proveedor';
  
  constructor() { }

  getAllProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.UrlBase);
  }

  getProveedorById(id : number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.UrlBase}/${id}`);
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.UrlBase}`, proveedor);
  }

  updateProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.UrlBase}/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.UrlBase}/${id}`);
  }
}
