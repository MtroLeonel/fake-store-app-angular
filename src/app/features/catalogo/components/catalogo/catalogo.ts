import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-catalogo',
  imports: [CurrencyPipe, FormsModule, ButtonModule, RatingModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalogo {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly productos = toSignal(this.productService.getProducts(), { initialValue: [] });
  readonly categorias = toSignal(this.productService.getCategories(), { initialValue: [] });
  readonly categoriaSeleccionada = signal<string>('Todas');
  readonly busqueda = signal<string>('');

  readonly productosFiltrados = computed(() => {
    const categoria = this.categoriaSeleccionada();
    const termino = this.busqueda().trim().toLowerCase();

    return this.productos().filter((producto) => {
      const coincideCategoria = categoria === 'Todas' || producto.category === categoria;
      const coincideBusqueda =
        termino.length === 0 ||
        producto.title.toLowerCase().includes(termino) ||
        producto.description.toLowerCase().includes(termino);

      return coincideCategoria && coincideBusqueda;
    });
  });

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada.set(categoria);
  }

  actualizarBusqueda(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.busqueda.set(target.value);
  }

  agregarProducto(productoId: number): void {
    const producto = this.productos().find((p) => p.id === productoId);
    if (!producto || !producto.stock || producto.stock <= 0) {
      return;
    }
    this.cartService.add(producto);
  }
}
