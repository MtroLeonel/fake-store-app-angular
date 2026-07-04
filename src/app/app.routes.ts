import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
    loadComponent: () => import('./features/catalogo/components/catalogo/catalogo').then(m => m.Catalogo)

    }
];
