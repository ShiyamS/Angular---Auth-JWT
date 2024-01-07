import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent implements OnInit {

  totalCartItem: number = 0
  cartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: (res) => {
        this.totalCartItem = res.length;
      }
    })
  }

}
