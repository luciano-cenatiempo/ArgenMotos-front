import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';

import { Observable } from 'rxjs';
import { Proveedor } from '../models/Proveedor';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService { 

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'proveedor';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}

  
  constructor(
    private _userService:UserService

  ) { }

  getAllProveedores(): Observable<Proveedor[]> {
    const headers = this.headers
    return this.http.get<Proveedor[]>(this.UrlBase, {headers});
  }

  getProveedorById(id : number): Observable<Proveedor> {
    const headers = this.headers

    return this.http.get<Proveedor>(`${this.UrlBase}/${id}`, {headers});
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    const headers = this.headers

    return this.http.post<Proveedor>(`${this.UrlBase}`, proveedor, {headers});
  }

  updateProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    const headers = this.headers

    return this.http.put<Proveedor>(`${this.UrlBase}/${id}`, proveedor, {headers});
  }

  deleteProveedor(id: number): Observable<Proveedor> {
    const headers = this.headers

    return this.http.delete<Proveedor>(`${this.UrlBase}/${id}`, {headers});
  }
}
