import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  otpForm: FormGroup;
  timer: number = 30;
  timerExpired: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  public userData :any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
      otp5: ['', [Validators.required, Validators.maxLength(1)]],
      otp6: ['', [Validators.required, Validators.maxLength(1)]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['email']) {
        // Correctly extract email from queryParams and populate userData
        const email = params['email'];
        const role = params['role'];

        this.userData = {
          registrationDetails: {
            email: email,
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            verified: false,
            verificationCode: '',
            verificationCodeValidation: 0
          },
          role: role
        };
      }
    });
    this.startTimer();
  }

  // Start the OTP timer
  startTimer(): void {
    const interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timerExpired = true;
        clearInterval(interval);
      }
    }, 1000);
  }

  // Handle OTP verification
verifyOtp(): void {
  // Check if user data is available
  if (!this.userData || !this.userData.registrationDetails) {
    this.errorMessage = 'User data is missing.';
    return;
  }

  // Combine 6-digit OTP
  const otp = [
    this.otpForm.value.otp1,
    this.otpForm.value.otp2,
    this.otpForm.value.otp3,
    this.otpForm.value.otp4,
    this.otpForm.value.otp5,
    this.otpForm.value.otp6
  ].join('');

  // Validate OTP length
  if (otp.length !== 6) {
    this.errorMessage = 'Please enter a valid 6-digit OTP.';
    return;
  }

  this.isLoading = true;

  const email = this.userData.registrationDetails.email;
  console.log('Verifying OTP for:', this.userData.role, 'Email:', email);

  this.authService.verifyOtp(otp, email).subscribe(
    (response: any) => {
      this.isLoading = false;

      if (response.success && response.role) {
        console.log('OTP verified successfully', response);

        // Update local role
        this.userData.role = response.role;

        // Redirect to confirmation page with query params
        this.router.navigate(['/confirmation-page'], {
          queryParams: {
            email: email,
            role: response.role
          },
          replaceUrl: true
        });
      } else {
        this.errorMessage = 'OTP verification failed or invalid role.';
      }
    },
    (error: any) => {
      this.isLoading = false;
      console.error('OTP verification failed', error);
      this.errorMessage = 'Invalid or expired OTP';
    }
  );
}






  resendOtp(): void {
    this.isLoading = true;
    this.errorMessage = '';  // Clear previous error messages
    this.otpForm.reset(); // Reset the form before sending a new OTP
    const email = this.userData.registrationDetails.email;

    this.authService.resendOtp(email).subscribe(
      (response: any) => {
        console.log('OTP resent', response);
        this.timer = 60;
        this.timerExpired = false;
        this.startTimer();
        this.isLoading = false;

        // Prevent verifyOtp() from being triggered automatically
        this.otpForm.markAsUntouched();
        this.otpForm.markAsPristine();
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error resending OTP', error);
      }
    );
  }

  moveFocus(index: number, event: any): void {
    const inputLength = event.target.value.length;

    if (inputLength === 1 && index < 5) {
      // Move forward if a digit is entered
      const nextInput = document.getElementsByClassName('otp-input').item(index + 1) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    else if (inputLength === 0 && index > 0 && event.inputType === "deleteContentBackward") {
      // Move backward if backspace is pressed
      const prevInput = document.getElementsByClassName('otp-input').item(index - 1) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }


}
