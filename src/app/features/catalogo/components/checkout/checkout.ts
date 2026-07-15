import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly totalItems = this.cartService.totalItems;
  readonly subtotal = this.cartService.subtotal;
  readonly shipping = computed(() => (this.totalItems() > 0 ? 5.99 : 0));
  readonly total = computed(() => this.subtotal() + this.shipping());
  readonly orderConfirmed = signal(false);

  readonly checkoutForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required]],
  });

  completeCheckout(): void {
    if (this.items().length === 0) {
      return;
    }

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.orderConfirmed.set(true);
    this.cartService.clear();
  }
}
