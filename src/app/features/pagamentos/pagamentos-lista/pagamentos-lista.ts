import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { MensalidadeService, Mensalidade } from '../../../core/services/mensalidade';
import { ClienteService, Cliente } from '../../../core/services/cliente';

@Component({
  selector: 'app-pagamentos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, MetricCard, StatusBadge],
  templateUrl: './pagamentos-lista.html',
  styleUrl: './pagamentos-lista.scss'
})
export class PagamentosLista implements OnInit {

  filtroMes: string = '';
  filtroStatus: string = '';
  carregando = false;
  pagamentos: Mensalidade[] = [];
  clientes: Cliente[] = [];

  meses = [
    { valor: '03/2025', label: 'Março 2025'     },
    { valor: '02/2025', label: 'Fevereiro 2025' },
    { valor: '01/2025', label: 'Janeiro 2025'   },
  ];

  constructor(
    private mensalidadeService: MensalidadeService,
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.carregando = true;
    this.clienteService.listar().subscribe({
      next: (c) => {
        this.clientes = [...c];
        this.cdr.detectChanges();
      }
    });
    this.mensalidadeService.listar(this.filtroMes, this.filtroStatus).subscribe({
      next: (dados) => {
        this.pagamentos = [...dados];
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Erro', err); this.carregando = false; }
    });
  }

  getNomeCliente(cliente_id: number): string {
    const cliente = this.clientes.find(c => c.id === cliente_id);
    return cliente ? cliente.nome : '—';
  }

  getStatus(status: string): 'pago' | 'pendente' | 'atrasado' {
    return status as 'pago' | 'pendente' | 'atrasado';
  }

  get pagamentosFiltrados() {
    return this.pagamentos;
  }

  get totalPagos()     { return this.pagamentos.filter(p => p.status === 'pago').length; }
  get totalPendentes() { return this.pagamentos.filter(p => p.status === 'pendente').length; }
  get totalAtrasados() { return this.pagamentos.filter(p => p.status === 'atrasado').length; }

  get receitaTotal() {
    const total = this.pagamentos
      .filter(p => p.status === 'pago')
      .reduce((acc, p) => acc + p.valor, 0);
    return `R$${total.toLocaleString('pt-BR')}`;
  }

  filtrar() { this.carregarDados(); }

  confirmarPagamento(pagamento: Mensalidade) {
    this.mensalidadeService.confirmar(pagamento.id!).subscribe({
      next: () => this.carregarDados(),
      error: (err) => console.error('Erro ao confirmar', err)
    });
  }

  limparFiltros() {
    this.filtroMes = '';
    this.filtroStatus = '';
    this.carregarDados();
  }
}