import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TransactionsActions from './transaction.actions';
import { RawTransaction } from '../models/transaction.model';

@Injectable()
export class TransactionsEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      switchMap(() =>
        this.http.get<RawTransaction[]>('/transactions').pipe(
          map((transactions) => TransactionsActions.loadTransactionsSuccess({ transactions })),
          catchError((error) => of(TransactionsActions.loadTransactionsFailure({ error })))
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransactionAction),
      switchMap(({ payload }) =>
        this.http.post('/transfer', payload).pipe(
          map(() => TransactionsActions.createTransactionSuccess()),
          catchError((error) => of(TransactionsActions.createTransactionFailure({ error })))
        )
      )
    )
  );

  reloadTransactionsAfterCreation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransactionSuccess),
      map(() => TransactionsActions.loadTransactions())
    )
  );


}
