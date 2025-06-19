import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Purchase } from 'src/app/core/models/purchase.model';

@Component({
  selector: 'app-student-purchases',
  templateUrl: './student-purchases.component.html',
  styleUrls: ['./student-purchases.component.css']
})
export class StudentPurchasesComponent implements OnInit {
  coursePurchases: Purchase[] = [];
  totalItems = 0;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadStudentPurchases();
  }

  loadStudentPurchases(): void {
    this.isLoading = true;
    this.paymentService.getAllCoursesPurchased().subscribe({
      next: (res) => {
        this.coursePurchases = res.items || [];
        this.totalItems = res.total || 0;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load purchased courses';
        this.isLoading = false;
      }
    });
  }

  onRefund(purchaseId: string): void {
    if (!purchaseId) {
      console.error('❌ Invalid purchase ID:', purchaseId);
      alert('Invalid purchase ID for refund.');
      return;
    }

    this.paymentService.refundPurchase(purchaseId).subscribe({
      next: () => {
        alert('Refund successful');
        this.loadStudentPurchases();
      },
      error: (err) => {
        alert(err?.error?.message || 'Refund failed');
      }
    });
  }

  // ✅ Check if refund is allowed within 5 minutes
  canRefund(item: Purchase): boolean {
    if (item.status !== 'purchased' || !item.purchasedAt) return false;

    const purchasedTime = new Date(item.purchasedAt).getTime();
    const now = Date.now();
    const diffMinutes = (now - purchasedTime) / 1000 / 60;

    return diffMinutes <= 5;
  }
}
