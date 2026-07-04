import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; //Se agrega para peticiones.

// Importaciones de PrimeNG y Animaciones
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()), // Habilita las peticiones a la API
    provideAnimationsAsync(),       // Habilita animaciones suaves para PrimeNG
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: false }
      }
    })
  ]
};
