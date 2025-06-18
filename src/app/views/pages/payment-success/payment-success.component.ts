import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Purchase } from 'src/app/core/models/purchase.model';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  summaryData: any[] = [];
  coursePurchases: Purchase[] = [];
  singlePurchase: Purchase | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Load selected purchase from service
    const purchase = this.paymentService.getSelectedProductForCheckout();

    if (purchase) {
      const courseId = purchase.courseId;
      const orderId = purchase.orderId;

      console.log('Loaded from localStorage:', purchase);

      if (courseId) {
        this.paymentService.getAllPurchasesByCourse(courseId).subscribe({
          next: data => {
            this.coursePurchases = data;
            console.log('Course purchases:', data);
          },
          error: err => console.error('Failed to load course purchases:', err)
        });
      }
    }

    // ✅ Corrected: Extract only `data` array from summary API
    this.paymentService.getPurchaseSummary().subscribe({
      next: res => {
        this.summaryData = res.data || []; // avoid runtime error
        console.log('Purchase Summary:', this.summaryData);
      },
      error: err => {
        console.error('Failed to load summary:', err);
        this.summaryData = [];
      }
    });
  }
}
