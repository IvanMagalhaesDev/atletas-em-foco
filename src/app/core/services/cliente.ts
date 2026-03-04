import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  whatsapp: string;
  data_nascimento?: string;
  dia_vencimento?: number;
  ativo: boolean;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private apiUrl = 'http://localhost:8000/clientes';

  constructor(private http: HttpClient) {}

  listar(busca: string = ''): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/?busca=${busca}`);
  }

  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/`, cliente);
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  inativar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}