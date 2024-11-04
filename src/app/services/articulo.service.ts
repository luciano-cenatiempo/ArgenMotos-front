import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { ArticuloDTO } from '../models/ArticuloDTO';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'articulo';
  private headers: any = {'Authorization':`Bearer ${this._userService.getToken()}`}
  constructor(
    private _userService:UserService
    
  ) {
   }

  getAllArticulos(): Observable<Articulo[]> {
    const headers = this.headers;
    return this.http.get<Articulo[]>(this.UrlBase,{headers});
  }

  getArticuloById(id : number): Observable<Articulo> {
    const headers = this.headers;
    return this.http.get<Articulo>(`${this.UrlBase}/${id}`,{headers});
  }

  createArticulo(articulo: Articulo): Observable<ArticuloDTO> {
    const headers = this.headers;
    return this.http.post<ArticuloDTO>(`${this.UrlBase}`, articulo,{headers});
  }

  updateArticulo(id: number, articulo: Articulo): Observable<Articulo> {
    const headers = this.headers;
    return this.http.put<Articulo>(`${this.UrlBase}/${id}`, articulo,{headers});
  }

  deleteArticulo(id: number): Observable<Articulo> {
    const headers = this.headers;
    return this.http.delete<Articulo>(`${this.UrlBase}/${id}`,{headers});
  }
}
