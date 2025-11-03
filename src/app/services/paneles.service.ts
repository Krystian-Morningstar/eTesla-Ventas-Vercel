import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelesService {
  private apiUrl = 'https://etesla-api-vercel.onrender.com/api/paneles';

  constructor(private http: HttpClient) { }

  getPaneles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getOrigenes(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/paneles/origen';
    return this.http.get<any[]>(url);
  }

  getMarcas(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/paneles/marca';
    return this.http.get<any[]>(url);
  }
}
