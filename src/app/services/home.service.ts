import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private dolarApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // API pública para tasas de cambio

  constructor(private http: HttpClient) {}

  getPrecioDolar(): Observable<any> {
    return this.http.get(this.dolarApiUrl);
  }
}
