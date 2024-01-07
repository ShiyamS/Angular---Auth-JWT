import { CommonModule, } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export default class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal: number = 0;

  cartService = inject(CartService)
  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      }
    })
  }


  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();

  }

}
