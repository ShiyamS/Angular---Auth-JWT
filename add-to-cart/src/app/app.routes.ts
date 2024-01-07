import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import("./component/product/product.component") },
  { path: 'cart', loadComponent: () => import("./component/cart/cart.component") }
];
