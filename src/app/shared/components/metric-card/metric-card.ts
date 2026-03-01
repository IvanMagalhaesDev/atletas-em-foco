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
  @Input() tipo: 'pago' | 'pendente' | 'atrasado' | 'receita' = 'pago';
  @Input() icone: string = '';
}