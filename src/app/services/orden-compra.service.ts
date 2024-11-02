import { inject, Injectable } from '@angular/core';
import { OrdenCompra } from '../models/orden-compra';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../settings/appSettings';
import { OrdenCompraDTO } from '../models/orden-compra-dto';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'OrdenDeCompra';
  constructor() { }
  getAll(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(this.UrlBase);
  }

  getById(id : number): Observable<OrdenCompra> {
    return this.http.get<OrdenCompra>(`${this.UrlBase}/${id}`);
  }

  create(ordenCompra: OrdenCompraDTO): Observable<OrdenCompra> {
    return this.http.post<OrdenCompra>(`${this.UrlBase}`, ordenCompra);
  }

  update(id: number, ordenCompra: OrdenCompraDTO): Observable<OrdenCompra> {
    return this.http.put<OrdenCompra>(`${this.UrlBase}/${id}`, ordenCompra);
  }

  delete(id: number): Observable<OrdenCompra> {
    return this.http.delete<OrdenCompra>(`${this.UrlBase}/${id}`);
  }


}
