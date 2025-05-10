import { createAction, props } from '@ngrx/store';
import { RawTransaction } from '../models/transaction.model';

export const loadTransactions = createAction('[Transactions API] Load Transactions');
export const loadTransactionsSuccess = createAction(
  '[Transactions API] Load Transactions Success',
  props<{ transactions: RawTransaction[] }>()
);
export const loadTransactionsFailure = createAction(
  '[Transactions API] Load Transactions Failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>()
);

export interface CreateTransactionPayload {
  receiverAccount: string;
  amount: number;
}
export const createTransactionAction = createAction(
  '[Transactions Page] Create Transaction',
  props<{ payload: CreateTransactionPayload }>()
);
export const createTransactionSuccess = createAction(
  '[Transactions API] Create Transaction Success'
);
export const createTransactionFailure = createAction(
  '[Transactions API] Create Transaction Failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>()
);
