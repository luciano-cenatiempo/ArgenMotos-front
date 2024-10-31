import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { Factura } from '../models/factura';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'factura';

  constructor() { }

  getAll(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.UrlBase);
  }

  getById(id : number): Observable<Factura> {
    return this.http.get<Factura>(`${this.UrlBase}/${id}`);
  }

  create(articulo: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.UrlBase}`, articulo);
  }
}
