import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/catalogo/components/catalogo/catalogo').then((m) => m.Catalogo),
    },
    {
        path: 'carrito',
        loadComponent: () =>
            import('./features/catalogo/components/carrito/carrito').then((m) => m.Carrito),
    },
    {
        path: 'checkout',
        loadComponent: () =>
            import('./features/catalogo/components/checkout/checkout').then((m) => m.Checkout),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
