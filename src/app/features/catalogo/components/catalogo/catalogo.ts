import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-catalogo',
  imports: [CurrencyPipe, FormsModule, ButtonModule, RatingModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

   private productService = inject(ProductService);

  // toSignal se suscribe automáticamente a HTTP y guarda los datos en un Signal
  productos = toSignal(this.productService.getProducts(), { initialValue: [] });
// Variable para el filtro de búsqueda
}
