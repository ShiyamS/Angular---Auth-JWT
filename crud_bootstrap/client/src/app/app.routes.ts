import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', loadComponent: () => import("./employee-dashboard/employee-dashboard.component") }
];
