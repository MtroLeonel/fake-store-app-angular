import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/catalogo/services/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private readonly cartService = inject(CartService);

  readonly totalItems = this.cartService.totalItems;
  readonly subtotal = this.cartService.subtotal;
}