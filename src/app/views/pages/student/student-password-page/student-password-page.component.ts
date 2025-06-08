import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from 'src/app/core/models/password.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PasswordService } from 'src/app/core/services/password.service';

@Component({
  selector: 'app-student-password-page',
  templateUrl: './student-password-page.component.html',
  styleUrls: ['./student-password-page.component.css']
})
export class StudentPasswordPageComponent implements OnInit {
  changePasswordForm!: FormGroup;
  userId!: string;
  isLoading: boolean = false;
  passwordUpdateSuccess: boolean = false;
  submitted = false;
  errorMessage = '';
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';

    if (!this.userId) {
      this.errorMessage = 'User ID is missing.';
      return;
    }

    this.initializeForm();
  }

  initializeForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],

    },{ validators: this.passwordMatchValidator });
  }

  get controls() {
    return this.changePasswordForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword ? { mismatch: true } : null;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      const { oldPassword, newPassword } = this.changePasswordForm.value;
      const passwordModel: ChangePassword = { oldPassword, newPassword };
      const role = localStorage.getItem('userRole');
        this.passwordService.changeStudentPassword(this.userId, passwordModel).subscribe(
          (response) => {
            this.isLoading = false;
            this.passwordUpdateSuccess = true;
            alert('Password changed successfully');
            this.router.navigate(['student/login-page']);
          },
          (error:any) => {
            this.isLoading = false;
            this.errorMessage = 'Error: ' + error.message;
          }
        );

    } else {
      this.isLoading = false;
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  goBack(): void {
    this.router.navigate(['talent-page/login']);
  }

}
