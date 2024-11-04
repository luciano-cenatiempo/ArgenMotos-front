import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { OtroComprobante } from '../models/otro-comprobante';
import { OtroComprobanteDto } from '../models/otro-comprobante-dto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OtroComprobanteService {

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'OtrosComprobantes';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}


  constructor(
    private _userService:UserService

  ) { }

  getAll(): Observable<OtroComprobante[]> {
    const headers = this.headers
    return this.http.get<OtroComprobante[]>(this.UrlBase, {headers});
  }

  getById(id : number): Observable<OtroComprobante> {
    const headers = this.headers

    return this.http.get<OtroComprobante>(`${this.UrlBase}/${id}`, {headers});
  }

  create(comprobante: OtroComprobanteDto): Observable<OtroComprobante> {
    const headers = this.headers

    return this.http.post<OtroComprobante>(`${this.UrlBase}`, comprobante, {headers});
  }
}
