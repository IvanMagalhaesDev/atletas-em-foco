import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.scss'
})
export class MetricCard {
  @Input() titulo: string = '';
  @Input() valor: string | number = '';
  @Input() tipo: 'pago' | 'pendente' | 'atrasado' | 'receita' | 'total' = 'pago';

  get icone(): string {
    const mapa: Record<string, string> = {
      pago:     'check_circle',
      pendente: 'schedule',
      atrasado: 'warning',
      receita:  'attach_money',
      total:    'group'
    };
    return mapa[this.tipo] || 'info';
  }
}