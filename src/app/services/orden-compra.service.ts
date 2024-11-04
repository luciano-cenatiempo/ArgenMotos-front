import { inject, Injectable } from '@angular/core';
import { OrdenCompra } from '../models/orden-compra';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../settings/appSettings';
import { OrdenCompraDTO } from '../models/orden-compra-dto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'OrdenDeCompra';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}

  constructor(
    private _userService:UserService

  ) { }
  getAll(): Observable<OrdenCompra[]> {
    const headers = this.headers
    return this.http.get<OrdenCompra[]>(this.UrlBase,{headers});
  }

  getById(id : number): Observable<OrdenCompra> {
    const headers = this.headers

    return this.http.get<OrdenCompra>(`${this.UrlBase}/${id}`,{headers});
  }

  create(ordenCompra: OrdenCompraDTO): Observable<OrdenCompra> {
    const headers = this.headers

    return this.http.post<OrdenCompra>(`${this.UrlBase}`, ordenCompra,{headers});
  }

  update(id: number, ordenCompra: OrdenCompraDTO): Observable<OrdenCompra> {
    const headers = this.headers

    return this.http.put<OrdenCompra>(`${this.UrlBase}/${id}`, ordenCompra,{headers});
  }

  delete(id: number): Observable<OrdenCompra> {
    const headers = this.headers

    return this.http.delete<OrdenCompra>(`${this.UrlBase}/${id}`,{headers});
  }


}
