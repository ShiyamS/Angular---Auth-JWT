import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { SharedService } from '../shared-service';
import { EmployeeDetail } from '../employee-detail model';
import { FormModalComponent } from '../form-modal/form-modal.component';

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
  @ViewChild(FormModalComponent) formModalComponent!: FormModalComponent;

  ngOnInit(): void {
    this.sharedService.activeEmployeeData.subscribe({
      next: (res) => {
        this.allEmplyomeeDetails = res;
      }
    })

    this.sharedService.getAllEmployee();

  }


  editEmpoylee(employee: any) {
    this.sharedService.updateAEmpDetail(employee);
  }

  deleteEmpoylee(id: number) {
    this.sharedService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert("Employee is deleted");
        this.sharedService.getAllEmployee();
      }
    })
  }

}
