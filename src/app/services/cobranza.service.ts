import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings';
import { CobranzaDto } from '../models/cobranza-dto';
import { Cobranza } from '../models/cobranza';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CobranzaService {

  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'cobranzas';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}

  
  constructor(
    private _userService:UserService

  ) { }

  getAllCobranzas(): Observable<Cobranza[]> {
    const headers = this.headers;

    return this.http.get<Cobranza[]>(this.UrlBase,{headers});
  }

  getCobranzaById(id : number): Observable<Cobranza> {
    const headers = this.headers;

    return this.http.get<Cobranza>(`${this.UrlBase}/${id}`,{headers});
  }

  createCobranza(empleado: CobranzaDto): Observable<Cobranza> {
    const headers = this.headers;

    return this.http.post<Cobranza>(`${this.UrlBase}`, empleado,{headers});
  }

  updateCobranza(id: number, empleado: CobranzaDto): Observable<Cobranza> {
    const headers = this.headers;

    return this.http.put<Cobranza>(`${this.UrlBase}/${id}`, empleado,{headers});
  }

  deleteCobranza(id: number): Observable<boolean> {
    const headers = this.headers;

    return this.http.delete<boolean>(`${this.UrlBase}/${id}`,{headers});
  }
}
