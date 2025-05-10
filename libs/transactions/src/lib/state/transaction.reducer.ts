import { createReducer, on, Action } from '@ngrx/store';
import { RawTransaction, Transaction, createTransaction as createTransactionModel } from '../models/transaction.model';
import * as TransactionsActions from './transaction.actions';

export const TRANSACTIONS_FEATURE_KEY = 'transactions';

export interface TransactionsState {
  list: Transaction[];
  loaded: boolean;
  loading: boolean;
  error: any | null;
  creating: boolean;
  createError: any | null;
}

export const initialTransactionsState: TransactionsState = {
  list: [],
  loaded: false,
  loading: false,
  error: null,
  creating: false,
  createError: null,
};

const reducer = createReducer(
  initialTransactionsState,
  on(TransactionsActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    list: transactions.map((raw: RawTransaction) => createTransactionModel(raw)),
    loading: false,
    loaded: true,
  })),
  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TransactionsActions.createTransactionAction, (state) => ({
    ...state,
    creating: true,
    createError: null,
  })),
  on(TransactionsActions.createTransactionSuccess, (state) => ({
    ...state,
    creating: false,
  })),
  on(TransactionsActions.createTransactionFailure, (state, { error }) => ({
    ...state,
    creating: false,
    createError: error,
  }))
);

export function transactionsReducer(state: TransactionsState | undefined, action: Action) {
  return reducer(state, action);
}
