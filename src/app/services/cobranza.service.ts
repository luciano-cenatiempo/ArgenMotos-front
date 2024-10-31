import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { CobranzaDto } from '../models/cobranza-dto';
import { Cobranza } from '../models/cobranza';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CobranzaService {

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'cobranzas';
  
  constructor() { }

  getAllCobranzas(): Observable<Cobranza[]> {
    return this.http.get<Cobranza[]>(this.UrlBase);
  }

  getCobranzaById(id : number): Observable<Cobranza> {
    return this.http.get<Cobranza>(`${this.UrlBase}/${id}`);
  }

  createCobranza(empleado: CobranzaDto): Observable<Cobranza> {
    return this.http.post<Cobranza>(`${this.UrlBase}`, empleado);
  }

  updateCobranza(id: number, empleado: CobranzaDto): Observable<Cobranza> {
    return this.http.put<Cobranza>(`${this.UrlBase}/${id}`, empleado);
  }

  deleteCobranza(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.UrlBase}/${id}`);
  }
}
