import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@commerzbank-interview-ws/data-access-transactions';

@Component({
  selector: 'ui-transaction-item',
  imports: [CommonModule],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction;
}
