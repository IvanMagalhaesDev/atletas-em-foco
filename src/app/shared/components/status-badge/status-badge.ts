import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="status">
      {{ labels[status] }}
    </span>
  `,
  styles: [`
    .badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;

      &.pago {
        background: #DCFCE7;
        color: #16A34A;
      }
      &.pendente {
        background: #FEF9C3;
        color: #CA8A04;
      }
      &.atrasado {
        background: #FEE2E2;
        color: #DC2626;
      }
    }
  `]
})
export class StatusBadge {
  @Input() status: 'pago' | 'pendente' | 'atrasado' = 'pendente';

  labels = {
    pago: '✅ Pago',
    pendente: '⏳ Pendente',
    atrasado: '🔴 Atrasado'
  };
}