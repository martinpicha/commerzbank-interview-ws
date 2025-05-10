import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@commerzbank-interview-ws/data-access-transactions';
import { TransactionItemComponent } from "../transaction-item/transaction-item.component";

@Component({
  selector: 'ui-transaction-list',
  imports: [CommonModule, TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] | null = [];

  // trackById(index: number, item: Transaction): string {
  //   return `${item.date.toISOString()}-${item.who}-${item.amount}-${item.category}-${item.type}`;
  // }
}
