import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstructurasService {
  private apiUrl = 'https://etesla-api-vercel.onrender.com/api/estructuras';

  constructor(private http: HttpClient) { }

  getEstructuras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrigenes(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/estructuras/origen';
    return this.http.get<any[]>(url);
  }

  getMarcas(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/estructuras/marca';
    return this.http.get<any[]>(url);
  }
}
