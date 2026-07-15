import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-carrito',
  imports: [CurrencyPipe, RouterLink, ButtonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carrito {
  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly totalItems = this.cartService.totalItems;
  readonly subtotal = this.cartService.subtotal;
  readonly shipping = computed(() => (this.totalItems() > 0 ? 5.99 : 0));
  readonly total = computed(() => this.subtotal() + this.shipping());

  increment(productId: number): void {
    this.cartService.increment(productId);
  }

  decrement(productId: number): void {
    this.cartService.decrement(productId);
  }

  remove(productId: number): void {
    this.cartService.remove(productId);
  }

  clear(): void {
    this.cartService.clear();
  }
}
