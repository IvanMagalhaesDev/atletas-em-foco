import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  whatsapp: string;
  dataNascimento: string;
  ativo: boolean;
}

@Component({
  selector: 'app-clientes-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, MetricCard],
  templateUrl: './clientes-lista.html',
  styleUrl: './clientes-lista.scss'
})
export class ClientesLista {

  busca: string = '';
  modalAberto = false;
  modoEdicao = false;

  clientes: Cliente[] = [
    { id: 1, nome: 'Renato William',  cpf: '123.456.789-00', whatsapp: '(85) 99999-0001', dataNascimento: '15/04/1990', ativo: true  },
    { id: 2, nome: 'Kelvin Vaz',      cpf: '234.567.890-11', whatsapp: '(85) 99999-0002', dataNascimento: '22/07/1995', ativo: true  },
    { id: 3, nome: 'Gabriel',   cpf: '345.678.901-22', whatsapp: '(85) 99999-0003', dataNascimento: '03/11/1988', ativo: true  },
    { id: 4, nome: 'João Pedro',      cpf: '456.789.012-33', whatsapp: '(85) 99999-0004', dataNascimento: '18/02/1993', ativo: true  },
    { id: 5, nome: 'Wesnei',    cpf: '567.890.123-44', whatsapp: '(85) 99999-0005', dataNascimento: '30/09/1997', ativo: false },
  ];

  clienteForm: Omit<Cliente, 'id'> = {
    nome: '', cpf: '', whatsapp: '', dataNascimento: '', ativo: true
  };

  clienteEditandoId: number | null = null;

  // ================================
  // FORMATAÇÕES AUTOMÁTICAS
  // ================================

  formatarCPF(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // remove tudo que não é número
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

    this.clienteForm.dataNascimento = valor;
    input.value = valor;
  }

  // ================================
  // LÓGICA DE LISTAGEM
  // ================================

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
    this.clienteForm = { nome: '', cpf: '', whatsapp: '', dataNascimento: '', ativo: true };
    this.modalAberto = true;
  }

  abrirModalEdicao(cliente: Cliente) {
    this.modoEdicao = true;
    this.clienteEditandoId = cliente.id;
    this.clienteForm = { ...cliente };
    this.modalAberto = true;
  }

  salvarCliente() {
    if (!this.clienteForm.nome || !this.clienteForm.cpf) return;

    if (this.modoEdicao && this.clienteEditandoId !== null) {
      const index = this.clientes.findIndex(c => c.id === this.clienteEditandoId);
      this.clientes[index] = { id: this.clienteEditandoId, ...this.clienteForm };
    } else {
      const novoId = Math.max(...this.clientes.map(c => c.id)) + 1;
      this.clientes.push({ id: novoId, ...this.clienteForm });
    }
    this.fecharModal();
  }

  toggleAtivo(cliente: Cliente) {
    cliente.ativo = !cliente.ativo;
  }

  fecharModal() {
    this.modalAberto = false;
    this.clienteEditandoId = null;
  }
}