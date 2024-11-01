import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { OtroComprobante } from '../models/otro-comprobante';
import { OtroComprobanteDto } from '../models/otro-comprobante-dto';

@Injectable({
  providedIn: 'root'
})
export class OtroComprobanteService {

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'OtrosComprobantes';

  constructor() { }

  getAll(): Observable<OtroComprobante[]> {
    return this.http.get<OtroComprobante[]>(this.UrlBase);
  }

  getById(id : number): Observable<OtroComprobante> {
    return this.http.get<OtroComprobante>(`${this.UrlBase}/${id}`);
  }

  create(comprobante: OtroComprobanteDto): Observable<OtroComprobante> {
    return this.http.post<OtroComprobante>(`${this.UrlBase}`, comprobante);
  }
}
