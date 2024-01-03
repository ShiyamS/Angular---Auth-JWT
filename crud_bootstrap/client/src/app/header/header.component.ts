
import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { SharedService } from '../shared-service';
import { FormModalComponent } from "../form-modal/form-modal.component";
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FormModalComponent, TableComponent]
})
export class HeaderComponent {

  sharedService = inject(SharedService)

  @ViewChild(FormModalComponent) formModalComponent!: FormModalComponent;

  addEmployee() {
    this.sharedService.emitAddEmployeeClick();
    // this.formModalComponent.resetForm();
  }
}
