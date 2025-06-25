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
  const purchase = this.paymentService.getSelectedProductForCheckout();

  if (purchase?.courseId) {
    console.log('Loaded from localStorage:', purchase);

    this.paymentService.getAllCoursesPurchased().subscribe({
      next: data => {
        this.coursePurchases = data.items || [];
        console.log('✅ Course purchases loaded:', this.coursePurchases);
      },
      error: err => {
        console.error('❌ Failed to load course purchases:', err);
        this.coursePurchases = [];
      }
    });
  }

  this.paymentService.getPurchaseSummary().subscribe({
    next: res => {
      this.summaryData = res.data || [];
      console.log('✅ Purchase Summary:', this.summaryData);
    },
    error: err => {
      console.error('❌ Failed to load summary:', err);
      this.summaryData = [];
    }
  });
}

}
