import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { ClienteDTO } from '../DTO/ClienteDTO';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'cliente';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}

  
  constructor(
    private _userService:UserService

  ) { }

  getAllClientes(): Observable<Cliente[]> {
    const headers = this.headers;
    return this.http.get<Cliente[]>(this.UrlBase,{headers});
  }

  getClienteById(id : number): Observable<Cliente> {
    const headers = this.headers;

    return this.http.get<Cliente>(`${this.UrlBase}/${id}`,{headers});
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    const headers = this.headers;

    return this.http.post<Cliente>(`${this.UrlBase}`, cliente,{headers});
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    const headers = this.headers;

    return this.http.put<Cliente>(`${this.UrlBase}/${id}`, cliente,{headers});
  }

  deleteCliente(id: number): Observable<Cliente> {
    const headers = this.headers;

    return this.http.delete<Cliente>(`${this.UrlBase}/${id}`,{headers});
  }
}
