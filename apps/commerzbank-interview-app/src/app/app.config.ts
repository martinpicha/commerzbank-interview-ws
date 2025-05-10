// apps/commerzbank-interview-app/src/app/app.config.ts
import { ApplicationConfig, LOCALE_ID, DEFAULT_CURRENCY_CODE, isDevMode } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';

// --- I18N Imports ---
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs'; // Import the base Czech locale data

// --- REGISTER THE LOCALE DATA (Part 1 of Step 2) ---
// This line registers the imported 'localeCs' data AND explicitly tells Angular
// to associate this data with the identifier 'cs-CZ'.
registerLocaleData(localeCs, 'cs-CZ');

// --- APPLICATION CONFIGURATION ---
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({}, {
        metaReducers: isDevMode() ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    provideEffects([]),
    isDevMode() ? provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }) : [],

    // --- I18N Providers (Part 2 of Step 2) ---
    // This tells Angular to use 'cs-CZ' as the default locale for all i18n operations.
    // Because we registered data with 'cs-CZ' above, Angular should now find it.
    { provide: LOCALE_ID, useValue: 'cs-CZ' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'CZK' } // Using standard ISO code
  ],
};
