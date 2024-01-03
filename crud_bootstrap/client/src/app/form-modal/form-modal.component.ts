import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Input, Renderer2, ElementRef, ViewChild, } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../shared-service';
import { EmployeeDetail } from '../employee-detail model';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent implements OnInit {
  isOpen = false;

  addEmployee!: FormGroup;

  employeeDetail = new EmployeeDetail();

  fb = inject(FormBuilder)
  elementRef = inject(ElementRef)
  renderer = inject(Renderer2)
  sharedService = inject(SharedService)

  isUpdate: boolean = false;
  updateEmpId: any = null;

  @ViewChild('modalClose')
  Close!: ElementRef;

  @ViewChild(TableComponent) tableComponent!: TableComponent


  ngOnInit(): void {
    this.addEmployee = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      emailId: ["", [Validators.required, Validators.email]],
      mobileNumber: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      salary: ["", [Validators.required, Validators.pattern(/^\d+$/)]]
    })

    this.sharedService.addEmplopeeClick.subscribe({
      next: (res) => {
        this.isOpen = res;
        console.log("Add emp called")
      }, error: (err) => {
        console.log(err)
      }
    })

    this.sharedService.addEmplopeeClick.subscribe({
      next: (res) => {
        this.addEmployee.reset();
      }
    })

    this.sharedService.updateAEmployeeDetail.subscribe({
      next: (res: any) => {
        console.log("In modal comp", res);
        if (res.id) {
          console.log("In modal lenght::", res);
          this.addEmployee.setValue({
            firstName: res.firstname,
            lastName: res.lastname,
            emailId: res.emailid,
            mobileNumber: res.mobilenumber,
            salary: res.salary
          })
          this.isUpdate = true;
          this.updateEmpId = res.id;
        }

      }
    })


  }

  resetForm() {
    this.addEmployee.reset();
  }

  addEmployeDetails() {

    const { firstName, lastName, emailId, mobileNumber, salary } = this.addEmployee.value;
    this.employeeDetail.firstname = firstName;
    this.employeeDetail.lastname = lastName;
    this.employeeDetail.emailid = emailId;
    this.employeeDetail.mobilenumber = mobileNumber;
    this.employeeDetail.salary = salary;

    console.log(this.employeeDetail);

    this.sharedService.postEmployee(this.employeeDetail).subscribe({
      next: (res) => {
        alert("employee added !")
        this.addEmployee.reset();
        this.Close.nativeElement.click();
        this.sharedService.getAllEmployee();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  updateEmployee() {

    const { firstName, lastName, emailId, mobileNumber, salary } = this.addEmployee.value;
    console.log(this.addEmployee.value);
    this.employeeDetail.firstname = firstName;
    this.employeeDetail.lastname = lastName;
    this.employeeDetail.emailid = emailId;
    this.employeeDetail.mobilenumber = mobileNumber;
    this.employeeDetail.salary = salary;

    this.sharedService.updateEmployee(this.employeeDetail, this.updateEmpId).subscribe({
      next: (res) => {
        alert("employee updated !")
        this.addEmployee.reset();
        this.Close.nativeElement.click();
        this.sharedService.getAllEmployee();
        this.isUpdate = false;
        this.updateEmpId = null;

      }
    })
  }

  closeModal() {
    this.isUpdate = false;
    this.updateEmpId = null;
  }
}
