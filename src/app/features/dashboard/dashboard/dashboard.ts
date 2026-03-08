import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { DashboardService } from '../../../core/services/dashboard';
import { ClienteService } from '../../../core/services/cliente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MetricCard, StatusBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  metricas = [
    { titulo: 'Pagos',     valor: 0,     tipo: 'pago'     as const },
    { titulo: 'Pendentes', valor: 0,     tipo: 'pendente' as const },
    { titulo: 'Atrasados', valor: 0,     tipo: 'atrasado' as const },
    { titulo: 'Receita',   valor: 'R$0', tipo: 'receita'  as const },
  ];

  clientesRecentes: any[] = [];
  graficoDados: { mes: string; total: number; receita: number }[] = [];
  maiorReceita = 0;

  constructor(
    private dashboardService: DashboardService,
    private clienteService: ClienteService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarResumo();
    this.carregarClientesRecentes();
    this.carregarGrafico();
  }

  carregarResumo() {
    this.dashboardService.resumo().subscribe({
      next: (dados) => {
        this.metricas[0].valor = dados.pagos;
        this.metricas[1].valor = dados.pendentes;
        this.metricas[2].valor = dados.atrasados;
        this.metricas[3].valor = `R$${dados.receita.toLocaleString('pt-BR')}`;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar resumo', err)
    });
  }

  carregarClientesRecentes() {
    this.clienteService.listar().subscribe({
      next: (clientes) => {
        this.clientesRecentes = clientes.slice(0, 5).map(c => ({
          nome: c.nome,
          vencimento: c.created_at
            ? new Date(c.created_at).toLocaleDateString('pt-BR')
            : '—',
          status: c.ativo ? 'pago' : 'atrasado'
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  carregarGrafico() {
    this.http.get<any[]>('http://localhost:8000/dashboard/grafico').subscribe({
      next: (dados) => {
        this.graficoDados = dados;
        this.maiorReceita = Math.max(...dados.map(d => d.receita), 1);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar gráfico', err)
    });
  }

  getAltura(receita: number): string {
    return `${(receita / this.maiorReceita) * 100}%`;
  }

  formatarMes(mes: string): string {
    const [m, ano] = mes.split('/');
    const meses = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                       'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${meses[parseInt(m)]}/${ano.slice(2)}`;
  }
}