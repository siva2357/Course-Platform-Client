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
        Object.keys(this.loginForm.controls).forEach(controlName => {
            this.loginForm.get(controlName)?.markAsTouched();
        });
        return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe(
        response => {
            console.log('Login response:', response);
            this.loginSuccess = true;

            if (response.token) {
                localStorage.setItem('Authorization', response.token);
                localStorage.setItem('userRole', response.role);
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('userData', JSON.stringify(response));
                const userType = response.role;
                this.authService.setUserRole(userType);
            }
            setTimeout(() => {
              this.isLoading = false;
              if (response.role === 'instructor') {
                this.router.navigate(response.profileComplete ?
                  ['instructor'] :
                  ['instructor/profile-form-page']);
              } else {
                console.warn('Unknown user role:', response.role);
              }
            }, 2000);
        },
        error => {
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


  goToForgotPassword(){
    this.router.navigate(['forgot-password']); // Corrected navigation

  }

}
