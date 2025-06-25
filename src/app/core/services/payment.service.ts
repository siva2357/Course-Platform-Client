import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Purchase } from '../models/purchase.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, of, retry, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private baseUrl: string = environment.apiUrl;
selectedProductForCheckout: Purchase | null = null;
  razorPayKey = environment.key_id;
    constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}



    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('JWT_Token');
      if (!token) {
        console.error("🚨 No token found in localStorage!");
        return new HttpHeaders();
      }
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }


getSelectedProductForCheckout(): Purchase | null {
  if (this.selectedProductForCheckout) {
    return this.selectedProductForCheckout;
  }

  // Fallback if page refreshed
  const stored = localStorage.getItem('selectedProductForCheckout');
  return stored ? JSON.parse(stored) : null;
}


setSelectedProductForCheckout(product: Purchase): void {
  this.selectedProductForCheckout = product;
  localStorage.setItem('selectedProductForCheckout', JSON.stringify(product));
}


createOrder(product: Purchase) {
  const payload = {
    amount: {
      amount: product.amount // nested amount
    },
    notes: {
      courseId: product.courseId,
      courseTitle: product.courseTitle
    }
  };

  return this.httpClient.post(`${this.baseUrl}/createPaymentOrder`, { payload });
}


verifyPaymentSignature(checkoutResponse: any, original_order_id: string) {
  const selectedProduct = this.getSelectedProductForCheckout(); // ✅ get full info from local storage

  const payload = {
    razorpay_signature: checkoutResponse.razorpay_signature,
    original_order_id: original_order_id,
    razorpay_payment_id: checkoutResponse.razorpay_payment_id,
    courseId: selectedProduct?.courseId,
    courseTitle: selectedProduct?.courseTitle,
    amount: selectedProduct?.amount,
    // optionally userId if available
  };

  return this.httpClient.post(`${this.baseUrl}/validatePayment`, { payload });
}


  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

 getRazorPayKey(): string {
  return this.razorPayKey; // return string directly
}

storePurchase(purchase: Purchase) {
  return this.httpClient.post(`${this.baseUrl}/purchase/store`, purchase);
}

// ✅ Get purchase by Razorpay Order ID
getPurchaseByOrderId(orderId: string): Observable<Purchase> {
  return this.httpClient.get<Purchase>(`${this.baseUrl}/purchase/order/${orderId}`);
}

// ✅ Get all purchases for a course
getAllPurchasesByCourse(courseId: string): Observable<Purchase[]> {
  return this.httpClient.get<Purchase[]>(`${this.baseUrl}/admin/purchases/course/${courseId}`);
}



getAllCoursesPurchased(): Observable<{ total: number, items: Purchase[] }> {
  return this.httpClient.get<{ total: number, items: Purchase[] }>(`${this.baseUrl}/student/purchase-history`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


// ✅ Get purchase summary grouped by course

  // ✅ Get purchase summary grouped by course
  getPurchaseSummary(): Observable<{ totalLength: number, data: any[] }> {
    return this.httpClient.get<{ totalLength: number, data: any[] }>(
      `${this.baseUrl}/admin/purchases`
    ).pipe(
      catchError(error => {
        console.error('Error fetching summary:', error);
        return of({ totalLength: 0, data: [] });
      })
    );
  }




getInstructorCoursesRevenue(): Observable<{ total: number, data: any[] }> {
  return this.httpClient.get<{ total: number, data: any[] }>(
    `${this.baseUrl}/instructor/revenue`,
    { headers: this.getHeaders() }
  ).pipe(
    catchError(this.handleError)
  );
}



  refundPurchase(purchaseId: string): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl}/purchase/${purchaseId}/refund`, {});
}


checkCourseAccess(courseId: string): Observable<{ access: boolean }> {
  return this.httpClient.post<{ access: boolean }>( `${this.baseUrl}/check-access`,{ courseId } // courseId in body
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
function _window(): any {
  // return the global native browser window object
  return window;
}



