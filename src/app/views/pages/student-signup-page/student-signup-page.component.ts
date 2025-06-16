import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-student-signup-page',
  templateUrl: './student-signup-page.component.html',
  styleUrls: ['./student-signup-page.component.css']
})
export class StudentSignupPageComponent  {

   registrationForm!: FormGroup;
   isLoading: boolean = false;
   isSubmitting = false;
   showPassword: boolean = false;
   showConfirmPassword: boolean = false;
   errorMessage = '';
   registrationSuccess: boolean = false;
   constructor(private formBuilder: FormBuilder, private router: Router,  private authService : AuthService,) {}

   ngOnInit(): void {
       this.initializeForm();
   }

   initializeForm(): void {
     this.registrationForm = this.formBuilder.group({
       _id: [null],
       fullName: ['', [Validators.required]],
       userName: ['', [Validators.required]],
       email: ['', [Validators.required]],
       password: ['', [Validators.required, Validators.minLength(6)]],
       role: ['instructor'],
     },);
   }

   get controls() {
     return this.registrationForm.controls;
   }

  submit(): void {
    if (this.registrationForm.valid) {
      const studentData: Student = {
        registrationDetails: {
          fullName: this.registrationForm.value.fullName,
          userName: this.registrationForm.value.userName,
          email: this.registrationForm.value.email,
          password: this.registrationForm.value.password, // Will be optional on the backend
        },
        role: 'student',
      };

      this.isLoading = true;

      this.authService. registerStudent(studentData).subscribe(
        (response: any) => {
          console.log('Registration successful', response);
          this.registrationSuccess = true;
          this.isLoading = false;
            this.router.navigate(['otp-verification'], {
              queryParams: { email:studentData.registrationDetails.email }
            });
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Registration failed', error);
        }
      );
    }
  }




   login(): void {
     this.router.navigate(['login-page']);
   }


 }

