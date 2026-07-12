import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);

  readonly items = this.itemsSignal.asReadonly();
  readonly totalItems = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  add(product: Product): void {
    this.itemsSignal.update((currentItems) => {
      const existing = currentItems.find((item) => item.product.id === product.id);

      if (existing) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  }

  clear(): void {
    this.itemsSignal.set([]);
  }
}