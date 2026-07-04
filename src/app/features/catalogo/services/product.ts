import {  inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../shared/interfaces/product.interface';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      // Simulamos que la API nos devuelve stock aleatorio (del 0 al 10)
      map(products => products.map(product => ({
        ...product,
        stock: Math.floor(Math.random() * 11)
      })))
    );
  }
}