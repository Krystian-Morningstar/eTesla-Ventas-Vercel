import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://etesla-api-vercel.onrender.com/api/login';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    const body = {
      correo: credentials.email,
      contrasena: credentials.password
    };
    return this.http.post<any>(this.apiUrl, body);
  }

  logout(): Observable<boolean> {
    // Elimina token en cliente y simula una respuesta del servidor
    localStorage.removeItem('token');
    return of(true).pipe(delay(200));
  }
}