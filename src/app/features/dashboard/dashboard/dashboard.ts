import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MetricCard, StatusBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  // Dados mockados — depois virão da API
  metricas = [
    { titulo: 'Pagos',     valor: 50,        tipo: 'pago'     as const, icone: '✅' },
    { titulo: 'Pendentes', valor: 40,        tipo: 'pendente' as const, icone: '⏳' },
    { titulo: 'Atrasados', valor: 10,        tipo: 'atrasado' as const, icone: '🔴' },
    { titulo: 'Receita',   valor: 'R$3.000', tipo: 'receita'  as const, icone: '💰' },
  ];

clientesRecentes = [
  { nome: 'Renato William',    vencimento: '05/03/2025', status: 'pago'     as const },
  { nome: 'Kelvin Vaz', vencimento: '08/03/2025', status: 'pendente' as const },
  { nome: 'Gabriel',  vencimento: '01/03/2025', status: 'atrasado' as const },
  { nome: 'João Pedro',     vencimento: '10/03/2025', status: 'pago'     as const },
  { nome: 'Wesney',  vencimento: '03/03/2025', status: 'atrasado' as const },
];

  meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  pagamentosPorMes = [38, 42, 50, 45, 48, 50];
  maiorValor = Math.max(...this.pagamentosPorMes);

  getAltura(valor: number): string {
    return `${(valor / this.maiorValor) * 100}%`;
  }
}