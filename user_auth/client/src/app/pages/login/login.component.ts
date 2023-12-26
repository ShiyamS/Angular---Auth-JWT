import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  route = inject(Router)

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  loginUser() {
    if (this.loginForm.value) {
      this.authService.loginService(this.loginForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          localStorage.setItem('user_id', res.data._id);
          this.authService.isLoggedIn$.next(true);
          this.route.navigate(['home']);
          this.loginForm.reset();
        },
        error: (err) => {
          console.error(err)
          this.loginForm.controls['password'].setErrors({ loginPasswordIncorrect: true })
        }
      })
    }
  }
}
