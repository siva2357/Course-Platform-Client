import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Login } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginDetails!: FormGroup;

  isLoading: boolean = false;
  loginSuccess: boolean = false;
  showPassword: boolean = false;
  submitted = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginDetails = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }

  // Get form controls
  get f() { return this.loginDetails.controls; }


onSubmit() {
  this.submitted = true;
  if (this.loginDetails.invalid) {
    Object.keys(this.loginDetails.controls).forEach(controlName => {
      this.loginDetails.get(controlName)?.markAsTouched();
    });
    return;
  }
  this.isLoading = true;
  this.authService.login(this.loginDetails.value).subscribe(
    response => {
      this.loginSuccess = true;
      if (response.token) {
        localStorage.setItem('Authorization', response.token);
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userData', JSON.stringify(response));
        this.authService.setUserRole(response.role);
      }

      // ✅ Redirect based on student/instructor/admin
      setTimeout(() => {
        this.isLoading = false;

        if (response.role === 'student') {
          this.router.navigate(response.profileComplete ?
            ['student'] :
            ['student/profile-form-page']);
        } else if (response.role === 'instructor') {
          this.router.navigate(response.profileComplete ?
            ['instructor'] :
            ['instructor/profile-form-page']);
        } else if (response.role === 'admin') {
          this.router.navigate(['admin']);
        } else {
          console.warn('Unknown user role:', response.role);
        }
      }, 2000);

    },
    (error: any) => {
      this.isLoading = false;
      this.loginSuccess = false;
    }
  );
}




  login() {
    this.router.navigate(['login']);
  }

goToSignupPage(){
    this.router.navigate(['sign-up']);
}

  goToForgotPassword(){
    this.router.navigate(['forgot-password']);
  }


}
