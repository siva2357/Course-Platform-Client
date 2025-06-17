import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Course, CoursePlan, CoursesResponse, Curriculum, LandingPage, Price } from '../models/course.model';
import { CartItem, WishList } from '../models/cart.model';

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


    SubmitCourseReview(courseId:string,) {
    return this.http.patch(`${this.baseUrl}/course/${courseId}/submit`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }






getAllCourses(): Observable<CoursesResponse> {
  return this.http.get<CoursesResponse>(`${this.baseUrl}/courses`, { headers: this.getHeaders() })
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
    return this.http.delete<{ message: string }>(`${this.baseUrl}/course/${id}/delete`, { headers: this.getHeaders() })
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
