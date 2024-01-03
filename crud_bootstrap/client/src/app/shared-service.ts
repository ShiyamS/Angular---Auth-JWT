import { HttpClient } from '@angular/common/http';
import { Injectable, inject, } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  http = inject(HttpClient)

  addEmplopeeClick = new BehaviorSubject(false);
  activeAddEmployeeData = new BehaviorSubject([]);

  updateAEmployeeDetail = new BehaviorSubject([]);


  activeEmployeeData = this.activeAddEmployeeData.asObservable();

  emitAddEmployeeClick() {
    this.addEmplopeeClick.next(true)
  }




  postEmployee(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(map((res: any) => {
      return res
    }))
  }

  getAllEmployee() {
    return this.http.get<any>('http://localhost:3000/posts').subscribe({
      next: (res) => {
        console.log(res);

        this.activeAddEmployeeData.next(res)
      }
    })
  }

  updateEmployee(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/posts/' + id, data).pipe(map((res: any) => {
      return res
    }))
  }


  deleteEmployee(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(map((res: any) => {
      return res
    }))
  }


  updateAEmpDetail(data: any) {
    this.updateAEmployeeDetail.next(data)
  }

}
