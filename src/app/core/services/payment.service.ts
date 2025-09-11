import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { InstructorPurchase, Purchase } from '../models/purchase.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, of, retry, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
function _window(): any {
  // return the global native browser window object
  return window;
}

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

  const headers = this.getHeaders(); // ✅ Include headers

  return this.httpClient.post(
    `${this.baseUrl}/createPaymentOrder`,
    { payload },
    { headers } // ✅ Pass JWT token here
  ).pipe(
    catchError(err => {
      console.error('❌ Error from /createPaymentOrder:', err);
      return throwError(() => err);
    })
  );
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
  };

  const headers = this.getHeaders(); // ✅ Include Authorization header

  return this.httpClient.post(
    `${this.baseUrl}/validatePayment`,
    { payload },
    { headers } // ✅ Add headers here
  );
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
  const headers = this.getHeaders(); // 👈 add Authorization header
  return this.httpClient.post(`${this.baseUrl}/purchase/store`, purchase, { headers });
}

refundPurchase(purchaseId: string): Observable<any> {
  const headers = this.getHeaders(); // 👈 add Authorization header
  return this.httpClient.patch(`${this.baseUrl}/purchase/${purchaseId}/refund`, {}, { headers });
}




// ✅ Get purchase by Razorpay Order ID
getPurchaseByOrderId(orderId: string): Observable<Purchase> {
  const headers = this.getHeaders(); // ✅ Attach token

  return this.httpClient.get<Purchase>(
    `${this.baseUrl}/purchase/order/${orderId}`,
    { headers }
  );
}




getAllCoursesPurchased(): Observable<{ total: number, data: any[] }> {
  return this.httpClient.get<{ total: number, data: any[] }>(`${this.baseUrl}/student/purchase-history`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}


// ✅ Get purchase summary grouped by course

  // ✅ Get purchase summary grouped by course
  getPurchaseSummary(): Observable<{ totalLength: number, data: any[] }> {
    return this.httpClient.get<{ totalLength: number, data: any[] }>(
      `${this.baseUrl}/admin/purchases`,{ headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        console.error('Error fetching summary:', error);
        return of({ totalLength: 0, data: [] });
      })
    );
  }




// Instructor service
getInstructorCoursesRevenue(): Observable<{ success: boolean; total: number; data: InstructorPurchase[] }> {
  return this.httpClient.get<{ success: boolean; total: number; data: InstructorPurchase[] }>(
    `${this.baseUrl}/instructor/revenue`,
    { headers: this.getHeaders() }
  ).pipe(
    catchError(this.handleError)
  );
}



checkCourseAccess(courseId: string): Observable<{ access: boolean }> {
  const headers = this.getHeaders();
  const body = { courseId };

  return this.httpClient
    .post<{ access: boolean }>(`${this.baseUrl}/check-access`, body, { headers })
    .pipe(
      catchError(this.handleError)
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



