import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-instructor-login-page',
  templateUrl: './instructor-login-page.component.html',
  styleUrls: ['./instructor-login-page.component.css'],
})
export class InstructorLoginPageComponent {
  loginForm!: FormGroup;

  isLoading: boolean = false;
  loginSuccess: boolean = false;
  showPassword: boolean = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [ '', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      password: ['',[ Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)],],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log('Form Submitted:', this.loginForm.value);
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      Object.keys(this.loginForm.controls).forEach((controlName) => {
        this.loginForm.get(controlName)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Login response:', response);
        this.loginSuccess = true;
        this.isLoading = false;

        if (response.role === 'instructor') {
          this.router.navigate(['instructor']);
        } else {
          console.warn('Unknown user role:', response.role);
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid credentials';
        this.isLoading = false;
        this.loginSuccess = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['learning']);
  }

  signUp(): void {
    this.router.navigate(['instructor/registration-page']);
  }
}
