import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardResumo {
  total_clientes: number;
  pagos: number;
  pendentes: number;
  atrasados: number;
  receita: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private apiUrl = 'http://localhost:8000/dashboard';

  constructor(private http: HttpClient) {}

  resumo(): Observable<DashboardResumo> {
    return this.http.get<DashboardResumo>(`${this.apiUrl}/resumo`);
  }
}