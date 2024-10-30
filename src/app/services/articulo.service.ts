import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { appSettings } from '../settings/appSettings';
import { Observable } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { ArticuloDTO } from '../models/ArticuloDTO';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private http = inject(HttpClient);

  private UrlBase: string = appSettings.apiUrl + 'articulo';
  
  constructor() { }

  getAllArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.UrlBase);
  }

  getArticuloById(id : number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.UrlBase}/${id}`);
  }

  createArticulo(articulo: Articulo): Observable<ArticuloDTO> {
    return this.http.post<ArticuloDTO>(`${this.UrlBase}`, articulo);
  }

  updateArticulo(id: number, articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.UrlBase}/${id}`, articulo);
  }

  deleteArticulo(id: number): Observable<Articulo> {
    return this.http.delete<Articulo>(`${this.UrlBase}/${id}`);
  }
}
