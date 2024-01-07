import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent implements OnInit {

  productList!: any;

  apiService = inject(ApiService)
  cartService = inject(CartService)

  ngOnInit(): void {

    this.apiService.getProduct().subscribe(
      {
        next: (allProduct) => {
          this.productList = allProduct;
          this.productList.forEach((a: any) => {
            Object.assign(a, { quantity: 1, total: a.price })
          })

          console.log(allProduct)
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);

  }
}
