import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import EmployeeDashboardComponent from "./employee-dashboard/employee-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HeaderComponent, EmployeeDashboardComponent]
})
export class AppComponent {
  title = 'crud_bootstrap';
}
