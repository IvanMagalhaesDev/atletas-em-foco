import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import { ClienteService, Cliente } from '../../../core/services/cliente';

@Component({
  selector: 'app-clientes-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, MetricCard],
  templateUrl: './clientes-lista.html',
  styleUrl: './clientes-lista.scss'
})
export class ClientesLista implements OnInit {

  busca: string = '';
  modalAberto = false;
  modoEdicao = false;
  carregando = false;
  clientes: Cliente[] = [];

clienteForm: Cliente = {
  nome: '', cpf: '', whatsapp: '', data_nascimento: '', dia_vencimento: undefined, ativo: true
};

  clienteEditandoId: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.carregando = true;
    this.clienteService.listar(this.busca).subscribe({
      next: (dados) => {
        console.log('Clientes recebidos:', dados);
        this.clientes = [...dados];
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar clientes', err);
        this.carregando = false;
      }
    });
  }

  get clientesFiltrados() {
    return this.clientes.filter(c =>
      c.nome.toLowerCase().includes(this.busca.toLowerCase()) ||
      c.cpf.includes(this.busca)
    );
  }

  get totalAtivos()   { return this.clientes.filter(c => c.ativo).length; }
  get totalInativos() { return this.clientes.filter(c => !c.ativo).length; }

abrirModalNovo() {
  this.modoEdicao = false;
  this.clienteEditandoId = null;
  this.clienteForm = {
    nome: '', cpf: '', whatsapp: '', data_nascimento: '', dia_vencimento: undefined, ativo: true
  };
  this.modalAberto = true;
}

  abrirModalEdicao(cliente: Cliente) {
    this.modoEdicao = true;
    this.clienteEditandoId = cliente.id!;
    this.clienteForm = { ...cliente };
    this.modalAberto = true;
  }

  salvarCliente() {
    if (!this.clienteForm.nome || !this.clienteForm.cpf) return;

    if (this.modoEdicao && this.clienteEditandoId !== null) {
      this.clienteService.atualizar(this.clienteEditandoId, this.clienteForm).subscribe({
        next: () => { this.carregarClientes(); this.fecharModal(); },
        error: (err) => console.error('Erro ao atualizar', err)
      });
    } else {
      this.clienteService.criar(this.clienteForm).subscribe({
        next: () => { this.carregarClientes(); this.fecharModal(); },
        error: (err) => console.error('Erro ao criar', err)
      });
    }
  }

  excluirCliente(cliente: Cliente) {
  if (!confirm(`Tem certeza que deseja excluir ${cliente.nome}?`)) return;
  this.clienteService.inativar(cliente.id!).subscribe({
    next: () => this.carregarClientes(),
    error: (err) => console.error('Erro ao excluir', err)
  });
}

  fecharModal() {
    this.modalAberto = false;
    this.clienteEditandoId = null;
  }

  // FORMATAÇÕES
  formatarCPF(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length <= 3)       valor = valor;
    else if (valor.length <= 6)  valor = valor.slice(0,3) + '.' + valor.slice(3);
    else if (valor.length <= 9)  valor = valor.slice(0,3) + '.' + valor.slice(3,6) + '.' + valor.slice(6);
    else                         valor = valor.slice(0,3) + '.' + valor.slice(3,6) + '.' + valor.slice(6,9) + '-' + valor.slice(9);
    this.clienteForm.cpf = valor;
    input.value = valor;
  }

  formatarWhatsApp(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length <= 2)       valor = '(' + valor;
    else if (valor.length <= 7)  valor = '(' + valor.slice(0,2) + ') ' + valor.slice(2);
    else                         valor = '(' + valor.slice(0,2) + ') ' + valor.slice(2,7) + '-' + valor.slice(7);
    this.clienteForm.whatsapp = valor;
    input.value = valor;
  }

  formatarData(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 8) valor = valor.slice(0, 8);
    if (valor.length <= 2)      valor = valor;
    else if (valor.length <= 4) valor = valor.slice(0,2) + '/' + valor.slice(2);
    else                        valor = valor.slice(0,2) + '/' + valor.slice(2,4) + '/' + valor.slice(4);
    this.clienteForm.data_nascimento = valor;
    input.value = valor;
  }

  diasVencimento = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
}

