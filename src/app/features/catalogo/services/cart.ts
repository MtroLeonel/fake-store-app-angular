import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../../shared/interfaces/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'fake-store-cart-v1';
  private readonly itemsSignal = signal<CartItem[]>([]);

  readonly items = this.itemsSignal.asReadonly();
  readonly totalItems = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  constructor() {
    this.restoreFromStorage();

    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      localStorage.setItem(this.storageKey, JSON.stringify(this.itemsSignal()));
    });
  }

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

  increment(productId: number): void {
    this.itemsSignal.update((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decrement(productId: number): void {
    this.itemsSignal.update((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  remove(productId: number): void {
    this.itemsSignal.update((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }

  clear(): void {
    this.itemsSignal.set([]);
  }

  private restoreFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const rawData = localStorage.getItem(this.storageKey);
    if (!rawData) {
      return;
    }

    try {
      const parsedData = JSON.parse(rawData) as unknown;

      if (!Array.isArray(parsedData)) {
        return;
      }

      const sanitizedItems = parsedData
        .filter((item): item is CartItem => {
          if (!item || typeof item !== 'object') {
            return false;
          }

          const candidate = item as { product?: Product; quantity?: number };
          return !!candidate.product && typeof candidate.quantity === 'number' && candidate.quantity > 0;
        })
        .map((item) => ({
          ...item,
          quantity: Math.floor(item.quantity),
        }))
        .filter((item) => item.quantity > 0);

      this.itemsSignal.set(sanitizedItems);
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }
}