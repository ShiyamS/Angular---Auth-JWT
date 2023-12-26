import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validators';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit {

  fb = inject(FormBuilder)
  activateRoute = inject(ActivatedRoute);
  router = inject(Router)
  authService = inject(AuthService)

  resetForm!: FormGroup;

  token!: string;

  ngOnInit(): void {

    this.resetForm = this.fb.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    }, {
      validator: confirmPasswordValidator("password", "confirmPassword")
    }
    )

    this.activateRoute.params.subscribe((val) => {
      this.token = val['token'];
      console.log(this.token);
    })

  }

  reset() {
    const resetObj = {
      toke: this.token,
      password: this.resetForm.value.password
    }

    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['/login']);

      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
