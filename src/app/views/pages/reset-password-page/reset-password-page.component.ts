import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  email: string = '';
  errorMessage: string | undefined;
  successMessage: string | undefined;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['email']) {
        this.email = params['email']; // Extract email from query params
      }
    });

    this.initializeForm();
  }

  initializeForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  get controls() {
    return this.resetPasswordForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.errorMessage = "Please enter a valid password.";
      return;
    }

    const newPassword = this.controls['newPassword'].value;

    this.passwordService.resetPassword(this.email, newPassword).subscribe(
      () => {
        this.successMessage = "Password reset successfully. You can now log in.";
        setTimeout(() => {
          this.router.navigate(['instructor/login-page']);
        }, 2000);
      },
      (error) => {
        this.errorMessage = error.error.message || "Error resetting password. Please try again.";
      }
    );
  }
}
