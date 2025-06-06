import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangePassword } from '../models/password.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = `${environment.apiUrl}`; // Automatically selects correct URL

  private role = localStorage.getItem('userRole') || '';
  private userData = JSON.parse(localStorage.getItem('userData') || '{}');

  isLoggedIn(): boolean {
    return !!localStorage.getItem('JWT_Token');
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('JWT_Token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Function to change password for recruiter
  changeInstructorPassword(id: string, passwordModel:ChangePassword): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/instructor/${id}/change-password`, passwordModel , { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
  }

  // Function to change password for seeker
  changeStudentPassword(id: string, passwordModel:ChangePassword): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/student/${id}/change-password`,  passwordModel , { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: any): Observable<never> {
    console.error('🔥 API Error:', error);
    if (error.status === 401) {
      alert('❌ Unauthorized! Please log in again.');
      localStorage.clear();
      window.location.href = 'talent-page/login';
    }
    return throwError(() => new Error(error.message || 'API Error'));
  }


  sendForgotPasswordCode(email: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/forgot-password-code`, { email })
      .pipe(catchError(error => {
        throw error;
      }));
  }

  verifyForgotPasswordCode(providedCode: string, email: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/verify-forgotPassword-code`,  {
      email,
      providedCode
    })
    .pipe(catchError(error => this.handleError(error)));
  }


   // Function to resend OTP to the user's email
 resendOtp(email: string): Observable<any> {
  return this.http.patch(`${this.baseUrl}/auth/forgot-password-code`, { email })
  .pipe(catchError(error => this.handleError(error)));
}


  resetPassword(email: string,  newPassword: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/auth/reset-password`, {
      email,
      newPassword
    })
    .pipe(catchError(error => this.handleError(error)));

  }


}
