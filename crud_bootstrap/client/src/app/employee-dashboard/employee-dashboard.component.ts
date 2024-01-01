import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TableComponent } from "../table/table.component";
import { FormModalComponent } from "../form-modal/form-modal.component";

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
  imports: [HeaderComponent, TableComponent, FormModalComponent]
})
export default class EmployeeDashboardComponent {
}
