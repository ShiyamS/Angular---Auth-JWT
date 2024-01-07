import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from "./component/header/header.component";
import ProductComponent from "./component/product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HeaderComponent, ProductComponent]
})
export class AppComponent {
  title = 'add-to-cart';
}
