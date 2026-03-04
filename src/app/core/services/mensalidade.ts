import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mensalidade {
  id?: number;
  cliente_id: number;
  mes_referencia: string;
  data_vencimento: string;
  data_pagamento?: string | null;
  valor: number;
  status: string;
  validado_por?: string | null;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class MensalidadeService {

  private apiUrl = 'http://localhost:8000/mensalidades';

  constructor(private http: HttpClient) {}

  listar(mes: string = '', status: string = ''): Observable<Mensalidade[]> {
    return this.http.get<Mensalidade[]>(`${this.apiUrl}/?mes=${mes}&status=${status}`);
  }

  criar(mensalidade: Mensalidade): Observable<Mensalidade> {
    return this.http.post<Mensalidade>(`${this.apiUrl}/`, mensalidade);
  }

  confirmar(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/confirmar`, {});
  }
}