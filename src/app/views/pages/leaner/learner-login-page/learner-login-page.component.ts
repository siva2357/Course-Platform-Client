import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learner-login-page',
  templateUrl: './learner-login-page.component.html',
  styleUrls: ['./learner-login-page.component.css']
})
export class LearnerLoginPageComponent {


    loginForm!: FormGroup;
    isLoading: boolean = false;
    isSubmitting = false;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    errorMessage = '';
    loginSuccess: boolean = false;

    constructor(private formBuilder: FormBuilder, private router: Router) {}

      ngOnInit(): void {
        this.initializeForm();
      }

      initializeForm(): void {
        this.loginForm = this.formBuilder.group({
          _id: [null], // ✅ For fetching and updating user details
          email: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });
      }

      get controls() {
        return this.loginForm.controls;
      }


      login(): void {
      }


      goBack(): void {
        this.router.navigate(['learning']);
      }

      signUp(): void {
        this.router.navigate(['learner/registration-page']);
      }

}
