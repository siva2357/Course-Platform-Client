import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Category, Course, CoursePlan, CoursesResponse, Curriculum, LandingPage, Price, UploadedFileData } from '../models/course.model';
import { CartItem, WishList } from '../models/cart.model';
import { Certificate } from '../models/certificate.model';
import { CourseTracking } from '../models/courseTracking.model';
import { CourseReport } from '../models/purchase.model';
import { CourseResponse } from '../models/courseResponse';

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

    postCourseLanding(courseId:string, landingPage: LandingPage): Observable<LandingPage> {
    return this.http.put<LandingPage>(`${this.baseUrl}/course/${courseId}/landing`, landingPage, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


 getCourseLanding(courseId: string): Observable<LandingPage> {
  return this.http.get<LandingPage>(`${this.baseUrl}/course/${courseId}/landing`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


    postCoursePlan(courseId:string, coursePlan: CoursePlan): Observable<CoursePlan> {
    return this.http.put<CoursePlan>(`${this.baseUrl}/course/${courseId}/plan`, coursePlan, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

 getCoursePlan(courseId: string): Observable<CoursePlan> {
  return this.http.get<CoursePlan>(`${this.baseUrl}/course/${courseId}/plan`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}

    postCourseContent(courseId:string, courseContent: Curriculum ): Observable<Curriculum > {
    return this.http.put<Curriculum>(`${this.baseUrl}/course/${courseId}/curriculum`, courseContent, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

   getCourseContent(courseId: string): Observable<Curriculum> {
  return this.http.get<Curriculum>(`${this.baseUrl}/course/${courseId}/curriculum`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


    postCoursePrice(courseId:string, courseContent: Price): Observable<Price> {
    return this.http.put<Price>(`${this.baseUrl}/course/${courseId}/price`, courseContent, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

     getCoursePrice(courseId: string): Observable<Price> {
  return this.http.get<Price>(`${this.baseUrl}/course/${courseId}/price`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}

SubmitCourseReview(courseId: string) {
  return this.http.patch(`${this.baseUrl}/course/${courseId}/submit`, {}, {
    headers: this.getHeaders()
  }).pipe(catchError(this.handleError));
}






getAllCourses(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/instructor/my-courses`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


getInstructorLearnerReport(): Observable<{ report: CourseReport[] }> {
  return this.http.get<{ report: CourseReport[] }>(
    `${this.baseUrl}/instructor/learners/report`,
    { headers: this.getHeaders() }
  ).pipe(
    catchError(this.handleError)
  );
}


getInstructorSummaryAnalytics(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/analytics/summary`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


getInstructorChartAnalytics(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/analytics/charts`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


getInstructorPurchaseSummary(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/analytics/recent-purchases`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


getCourseById(id: string): Observable<Course> {
  return this.http.get<{ success: boolean; course: Course }>(`${this.baseUrl}/course/${id}`, { headers: this.getHeaders() })
    .pipe(
      map(response => response.course),  // extract course from response
      catchError(this.handleError)
    );
}

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/course/${id}`, course, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteCourse(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/course/${id}/delete`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }



getPublishedCourses(): Observable<Category> {
  return this.http.get<Category>(`${this.baseUrl}/student/courses`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


getPurchasedCourses(): Observable<CoursesResponse> {
  return this.http.get<CoursesResponse>(`${this.baseUrl}/student/my-courses`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


// Add a course to cart
addToCart(courseId: string): Observable<CartItem> {
  return this.http.post<CartItem>(`${this.baseUrl}/cart/add`, { courseId }, {
    headers: this.getHeaders()
  }).pipe(catchError(this.handleError));
}


private cartUpdated = new Subject<void>();
cartUpdated$ = this.cartUpdated.asObservable();

triggerCartUpdate() {
  this.cartUpdated.next();
}


// Get all courses in cart
getFromCart(): Observable<{ totalItems: number, items: CartItem[] }> {
  return this.http.get<{ totalItems: number, items: CartItem[] }>(
    `${this.baseUrl}/cart`, { headers: this.getHeaders() }
  ).pipe(catchError(this.handleError));
}

// Remove a specific course from cart by courseId
removeFromCart(courseId: string): Observable<CartItem> {
  return this.http.delete<CartItem>(`${this.baseUrl}/cart/delete/${courseId}`, {
    headers: this.getHeaders()
  }).pipe(catchError(this.handleError));
}


// Add a course to cart
// Add to wishlist
addToWishlist(courseId: string): Observable<WishList> {
  return this.http.post<WishList>(`${this.baseUrl}/wishlist/add`, { courseId }, {
    headers: this.getHeaders()
  }).pipe(catchError(this.handleError));
}

// Get wishlist
getFromWishlist(): Observable<{ totalItems: number, items: WishList[] }> {
  return this.http.get<{ totalItems: number, items: WishList[] }>(
    `${this.baseUrl}/wishlist`, { headers: this.getHeaders() }
  ).pipe(catchError(this.handleError));
}

// Remove from wishlist
removeFromWishlist(courseId: string): Observable<WishList> {
  return this.http.delete<WishList>(`${this.baseUrl}/wishlist/delete/${courseId}`, {
    headers: this.getHeaders()
  }).pipe(catchError(this.handleError));
}


generateCertificate(studentName: string, courseTitle: string, issueDate: string): Observable<Blob> {
  const payload = { studentName, courseTitle, issueDate };

  return this.http.post(`${this.baseUrl}/certificate/generate-certificate`, payload, {
    headers: this.getHeaders(),       // your existing headers, e.g. Content-Type
    responseType: 'blob'              // important: tells Angular to expect binary Blob
  }).pipe(
    catchError(this.handleError)      // your existing error handling
  );
}


getAllCertifiedCourses(): Observable<{ total: number, data: any[] }> {
  return this.http.get<{ total: number, data: any[] }>(
    `${this.baseUrl}/course/certificate/all`,
    { headers: this.getHeaders() }
  );
}


getCertifiedCourseDetails(courseId: string): Observable<any> {
  return this.http.get<any>(
    `${this.baseUrl}/course/certificate/details/${courseId}`,
    { headers: this.getHeaders() }
  );
}


markContentCompleted(courseId: string, lectureId: string, contentId: string): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/course/track/content`,
    { courseId, lectureId, contentId },
    { headers: this.getHeaders() }
  );
}

markLectureCompleted(courseId: string, lectureId: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/course/track/complete`, { courseId, lectureId },   { headers: this.getHeaders() });
}

getCourseProgress(courseId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/course/track/progress/${courseId}`,   { headers: this.getHeaders() });
}



getCourses(): Observable<CourseResponse> {
  return this.http
    .get<CourseResponse>(`${this.baseUrl}/admin/all-courses`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


  getCourseDetails(courseId:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/course/${courseId}/course-details`, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  }


// course.service.ts
approveCourse(courseId: string, adminId: string): Observable<any> {
  return this.http.patch<any>(
    `${this.baseUrl}/admin/courses/${courseId}/approve`,
    { adminId }, // payload only includes admin info
    { headers: this.getHeaders() }
  ).pipe(catchError(this.handleError));
}

rejectCourse(courseId: string, adminId: string): Observable<any> {
  return this.http.patch<any>(
    `${this.baseUrl}/admin/courses/${courseId}/reject`,
    { adminId },
    { headers: this.getHeaders() }
  ).pipe(catchError(this.handleError));
}








  // 🔹 Fetch all course files for an instructor's course
// GET all files for instructor
getInstructorCourseFiles(): Observable<{ courses: any[] }> {
  return this.http.get<{ courses: any[] }>(
    `${this.baseUrl}/course-files`,
    { headers: this.getHeaders() }
  ).pipe(
    catchError(err => {
      console.error('Failed to fetch instructor course files', err);
      throw err;
    })
  );
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
