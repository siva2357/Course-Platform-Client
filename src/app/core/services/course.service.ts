import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('JWT_Token');
    if (!token) {
      console.error("🚨 No token found in localStorage!");
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }



  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/course`, course, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/course/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/course/${id}`, course, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteCourse(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/course/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
