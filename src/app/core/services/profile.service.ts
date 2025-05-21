import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { InstructorProfile, StudentProfile} from '../models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = `${environment.apiUrl}`;

  private role = localStorage.getItem('userRole') || '';
  private userData = JSON.parse(localStorage.getItem('userData') || '{}');

  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('JWT_Token');

    if (!token) {
      console.error("🚨 No token found in localStorage!");
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(private http: HttpClient) { }

  getInstructorIdProfileById(instructorId: string): Observable<InstructorProfile> {
    if (this.role === 'instructor' && this.userData._id === instructorId) {
      return of(this.userData);
    } else {
      return this.http.get<InstructorProfile>(`${this.baseUrl}/instructor/${instructorId}/profile-details`, { headers: this.getHeaders() })
        .pipe(catchError(error => this.handleError(error)));
    }
  }


  postInstructorProfile(profileData: InstructorProfile): Observable<InstructorProfile> {
    return this.http.post<InstructorProfile>(`${this.baseUrl}/instructor/profile-details`, profileData, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
  }

  updateInstructorProfile(instructorId: string,updatedData: InstructorProfile): Observable<InstructorProfile> {
    return this.http.put<InstructorProfile>(`${this.baseUrl}/instructor/${instructorId}/profile-details`, updatedData, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
}



  getStudentIdProfileById(studentId: string): Observable<StudentProfile> {
    if (this.role === 'student' && this.userData._id === studentId) {
      return of(this.userData);
    } else {
      return this.http.get<StudentProfile>(`${this.baseUrl}/student/${studentId}/profile-details`, { headers: this.getHeaders() })
        .pipe(catchError(error => this.handleError(error)));
    }
  }


  postStudentProfile(profileData: StudentProfile, studentId: string): Observable<StudentProfile> {
    return this.http.post<StudentProfile>(`${this.baseUrl}/student/${studentId}/profile-details`, profileData, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
  }

  updateStudentProfile(studentId: string,updatedData: StudentProfile): Observable<StudentProfile> {
    return this.http.put<StudentProfile>(`${this.baseUrl}/student/${studentId}/profile-details`, updatedData, { headers: this.getHeaders() })
      .pipe(catchError(error => this.handleError(error)));
}


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
