import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  loadTransactions,
  createTransactionAction, // Use the renamed action
  CreateTransactionPayload,
  selectAllTransactions,
  selectTransactionsLoading,
  selectTransactionsError,
  selectTransactionCreating,
  selectTransactionCreateError,
  Transaction
} from '@commerzbank-interview-ws/data-access-transactions';
import { Observable } from 'rxjs';

import { TransferFormComponent, TransactionListComponent, StandingOrdersPromoComponent} from '@commerzbank-interview-ws/ui-cards';


@Component({
  selector: 'feat-dashboard', // Or your prefix 'cb-ia-dashboard'
  standalone: true,
  imports: [
    CommonModule,
    TransferFormComponent,
    TransactionListComponent,
    StandingOrdersPromoComponent,
  ],
  templateUrl: './feature-dashboard.component.html',
  styleUrls: ['./feature-dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  creating$: Observable<boolean>;
  createError$: Observable<any>;

  constructor(private store: Store) {
    this.transactions$ = this.store.select(selectAllTransactions);
    this.loading$ = this.store.select(selectTransactionsLoading);
    this.error$ = this.store.select(selectTransactionsError);
    this.creating$ = this.store.select(selectTransactionCreating);
    this.createError$ = this.store.select(selectTransactionCreateError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTransactions());
  }

  onTransfer(payload: CreateTransactionPayload): void {
    this.store.dispatch(createTransactionAction({ payload })); // Use renamed action
  }
}
