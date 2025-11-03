import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  private apiUrl = 'https://etesla-api-vercel.onrender.com/api/clientes';

  constructor(private http: HttpClient) { }

  // Obtener lista de clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo cliente
  crearCliente(cliente: any): Observable<any> {
    const url = 'https://etesla-api-vercel.onrender.com/api/clientes/nuevo';
    return this.http.post<any>(url, cliente);
  }

  // Eliminar un cliente
  SoftDeleteCliente(id: number): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/clientes/${id}`;
    return this.http.delete<any>(url);
  }
  
  // Restaurar un cliente eliminado
  reactivarCliente(id: number): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/clientes/${id}/reactivar`;
    return this.http.patch<any>(url, {});
  }
  
  // Actualizar un cliente existente
  actualizarCliente(id: number, cliente: any): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/clientes/${id}`;
    return this.http.put<any>(url, cliente);
  }
}
