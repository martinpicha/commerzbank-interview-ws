import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRANSACTIONS_FEATURE_KEY, TransactionsState } from './transaction.reducer';

export const selectTransactionsState = createFeatureSelector<TransactionsState>(TRANSACTIONS_FEATURE_KEY);

export const selectAllTransactions = createSelector(
  selectTransactionsState,
  (state) => state.list
);

export const selectTransactionsLoaded = createSelector(
  selectTransactionsState,
  (state) => state.loaded
);

export const selectTransactionsLoading = createSelector(
  selectTransactionsState,
  (state) => state.loading
);

export const selectTransactionsError = createSelector(
  selectTransactionsState,
  (state) => state.error
);

export const selectTransactionCreating = createSelector(
  selectTransactionsState,
  (state) => state.creating
);

export const selectTransactionCreateError = createSelector(
  selectTransactionsState,
  (state) => state.createError
);
