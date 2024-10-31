import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { Factura } from '../models/factura';
import { Observable } from 'rxjs';
import { FacturaDto } from '../models/factura-dto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'facturas';

  constructor() { }

  getAll(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.UrlBase);
  }

  getById(id : number): Observable<Factura> {
    return this.http.get<Factura>(`${this.UrlBase}/${id}`);
  }

  create(factura: FacturaDto): Observable<Factura> {
    return this.http.post<Factura>(`${this.UrlBase}`, factura);
  }
}
