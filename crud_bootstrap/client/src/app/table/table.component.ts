import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../shared-service';
import { EmployeeDetail } from '../employee-detail model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  allEmplyomeeDetails!: any;

  sharedService = inject(SharedService)

  ngOnInit(): void {
    this.sharedService.activeEmployeeData.subscribe({
      next: (res) => {
        this.allEmplyomeeDetails = res;
      }
    })

    this.sharedService.getAllEmployee();

  }


}
