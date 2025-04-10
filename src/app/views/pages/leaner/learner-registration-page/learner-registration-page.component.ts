import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learner-registration-page',
  templateUrl: './learner-registration-page.component.html',
  styleUrls: ['./learner-registration-page.component.css']
})
export class LearnerRegistrationPageComponent{

  registrationForm!: FormGroup;
  isLoading: boolean = false;
  isSubmitting = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errorMessage = '';
  registrationSuccess: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      _id: [null], // ✅ For fetching and updating user details
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['recruiter'],
    }, { validators: this.passwordMatchValidator });
  }

  get controls() {
    return this.registrationForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  }

  submit(): void {
  }


  goBack(): void {
    this.router.navigate(['learning']);
  }

  login(): void {
    this.router.navigate(['learner/login-page']);
  }


}
