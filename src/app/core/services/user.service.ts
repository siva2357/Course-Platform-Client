import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Instructor, Student } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode' ;
import { InstructorProfile } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = `${environment.apiUrl}`;

  private role = localStorage.getItem('userRole') || '';
  private userData = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // const token = localStorage.getItem('token');

const token = localStorage.getItem('JWT_Token');
if (token) {
  const decodedToken: any = jwtDecode(token);
}

    if (!token) {
      console.error("🚨 No token found in localStorage!");
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private handleError(error: any): Observable<never> {
    console.error('🔥 API Error:', error);
    if (error.status === 401) {
      alert('❌ Unauthorized! Please log in again.');
      localStorage.clear();
      window.location.href = '/login';
    }
    return throwError(() => new Error(error.message || 'API Error'));
  }


  private validateUserData() {
    if (!this.userData || !this.userData._id) {
      console.error('🚨 Invalid user data in localStorage!');
      return false;
    }
    return true;
  }


  getInstructorById(id: string): Observable<Instructor> {
      if (this.role === 'instructor' && this.userData._id === id) {
      return of(this.userData);
    } else {
      return this.http.get<Instructor>(`${this.baseUrl}/instructor/${id}/profile-settings`, { headers: this.getHeaders()}).pipe(catchError(error => this.handleError(error)));
    }
  }

  getStudentById(id: string): Observable<Student> {
    if (this.role === 'student' && this.userData._id === id) {
      return of(this.userData);
    } else {
      return this.http.get<Student>(`${this.baseUrl}/student/${id}`, { headers: this.getHeaders()}).pipe(catchError(error => this.handleError(error)));
    }
  }

  getUserDetails(id: string): Observable<any> {
    console.log("Role in localStorage:", this.role);
    if (!this.validateUserData()) {
      return throwError(() => new Error('User data is invalid or missing.'));
    }
    switch(this.role) {
      case 'instructor':
        return this.getInstructorById(id);
      case 'student':
        return this.getStudentById(id);
      default:
        console.error('🚨 Invalid role');
        return throwError(() => new Error('Invalid role'));
    }
  }


  deleteInstructorById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/instructor/${id}/delete`, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
  }

  deleteStudentById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/student/${id}/delete`, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
  }


}
