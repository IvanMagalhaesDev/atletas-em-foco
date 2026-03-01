import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

interface Pagamento {
  id: number;
  cliente: string;
  vencimento: string;
  dataPagamento: string | null;
  valor: number;
  status: 'pago' | 'pendente' | 'atrasado';
  validadoPor: 'auto' | 'admin' | null;
}

@Component({
  selector: 'app-pagamentos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, MetricCard, StatusBadge],
  templateUrl: './pagamentos-lista.html',
  styleUrl: './pagamentos-lista.scss'
})
export class PagamentosLista {

  filtroMes: string = '';
  filtroStatus: string = '';

  pagamentos: Pagamento[] = [
    { id: 1, cliente: 'Renato William',  vencimento: '05/03/2025', dataPagamento: '03/03/2025', valor: 150, status: 'pago',     validadoPor: 'admin' },
    { id: 2, cliente: 'Kelvin Vaz',      vencimento: '08/03/2025', dataPagamento: null,          valor: 150, status: 'pendente', validadoPor: null    },
    { id: 3, cliente: 'Gabriel Silva',   vencimento: '01/03/2025', dataPagamento: null,          valor: 150, status: 'atrasado', validadoPor: null    },
    { id: 4, cliente: 'João Pedro',      vencimento: '10/03/2025', dataPagamento: '10/03/2025',  valor: 150, status: 'pago',     validadoPor: 'auto'  },
    { id: 5, cliente: 'Wesnei',    vencimento: '03/03/2025', dataPagamento: null,          valor: 150, status: 'atrasado', validadoPor: null    },
    { id: 6, cliente: 'Renato William',  vencimento: '05/02/2025', dataPagamento: '04/02/2025',  valor: 150, status: 'pago',     validadoPor: 'auto'  },
    { id: 7, cliente: 'Kelvin Vaz',      vencimento: '08/02/2025', dataPagamento: '08/02/2025',  valor: 150, status: 'pago',     validadoPor: 'admin' },
    { id: 8, cliente: 'Gabriel',   vencimento: '01/02/2025', dataPagamento: '05/02/2025',  valor: 150, status: 'pago',     validadoPor: 'auto'  },
  ];

  meses = [
    { valor: '03/2025', label: 'Março 2025'    },
    { valor: '02/2025', label: 'Fevereiro 2025' },
    { valor: '01/2025', label: 'Janeiro 2025'   },
  ];

  get pagamentosFiltrados() {
    return this.pagamentos.filter(p => {
      const mesOk     = !this.filtroMes    || p.vencimento.slice(3) === this.filtroMes;
      const statusOk  = !this.filtroStatus || p.status === this.filtroStatus;
      return mesOk && statusOk;
    });
  }

  get totalPagos()     { return this.pagamentos.filter(p => p.status === 'pago').length; }
  get totalPendentes() { return this.pagamentos.filter(p => p.status === 'pendente').length; }
  get totalAtrasados() { return this.pagamentos.filter(p => p.status === 'atrasado').length; }
  get receitaTotal()   {
    const total = this.pagamentos
      .filter(p => p.status === 'pago')
      .reduce((acc, p) => acc + p.valor, 0);
    return `R$${total.toLocaleString('pt-BR')}`;
  }

  confirmarPagamento(pagamento: Pagamento) {
    pagamento.status = 'pago';
    pagamento.validadoPor = 'admin';
    const hoje = new Date();
    pagamento.dataPagamento = hoje.toLocaleDateString('pt-BR');
  }

  limparFiltros() {
    this.filtroMes = '';
    this.filtroStatus = '';
  }
}