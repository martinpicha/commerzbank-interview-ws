import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'; // Correct import
import {
  TRANSACTIONS_FEATURE_KEY,
  transactionsReducer,
  TransactionsEffects // This is the effects class
} from '@commerzbank-interview-ws/data-access-transactions';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    // For standalone, we load the component directly
    loadComponent: () =>
      import('@commerzbank-interview-ws/feature-dashboard').then(
        (m) => m.DashboardComponent // Ensure DashboardComponent is exported from this lib's index.ts
      ),
    // Providers specific to this route and its children
    providers: [
      provideState(TRANSACTIONS_FEATURE_KEY, transactionsReducer),
      provideEffects(TransactionsEffects)
    ],
  },
  { path: '**', redirectTo: 'dashboard' } // Basic catch-all
];
