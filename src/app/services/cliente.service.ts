import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { ClienteDTO } from '../DTO/ClienteDTO';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'cliente';
  
  constructor() { }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.UrlBase);
  }

  getClienteById(id : number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.UrlBase}/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.UrlBase}`, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.UrlBase}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.UrlBase}/${id}`);
  }
}
