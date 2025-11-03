// cuenta.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrl = 'https://etesla-api-vercel.onrender.com/api/usuario';

  constructor(private http: HttpClient) { }

  getUsuarioActual(): Observable<Usuario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario>(this.apiUrl, { headers });
  }
}
