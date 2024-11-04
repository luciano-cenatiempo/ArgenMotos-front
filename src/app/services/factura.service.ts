import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { Factura } from '../models/factura';
import { Observable } from 'rxjs';
import { FacturaDto } from '../models/factura-dto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'facturas';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}


  constructor(
    private _userService:UserService

  ) { }

  getAll(): Observable<Factura[]> {
    const headers = this.headers
    return this.http.get<Factura[]>(this.UrlBase,{headers});
  }

  getById(id : number): Observable<Factura> {
    const headers = this.headers

    return this.http.get<Factura>(`${this.UrlBase}/${id}`,{headers});
  }

  create(factura: FacturaDto): Observable<Factura> {
    const headers = this.headers

    return this.http.post<Factura>(`${this.UrlBase}`, factura,{headers});
  }
}
