import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';

interface PurchaseItem {
  purchaseId: string;
  status: string;
  statusLabel: string;
  coursePrice: number;
  taxCharges: number;
  totalPaid: number;
  purchasedAt: string;
  refundCharges: number;
  refundedAmount: number;
  courseId: string;
  courseTitle: string;
  courseThumbnail: string;
  courseCategory: string;
  courseInstructor: string;
}

@Component({
  selector: 'app-student-purchases',
  templateUrl: './student-purchases.component.html',
  styleUrls: ['./student-purchases.component.css']
})
export class StudentPurchasesComponent implements OnInit {
  coursePurchases: PurchaseItem[] = [];
  totalItems = 0;
  isLoading = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadStudentPurchases();
  }

  loadStudentPurchases(): void {
    this.isLoading = true;
    this.paymentService.getAllCoursesPurchased().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.coursePurchases = res.data || [];
          this.totalItems = res.total || this.coursePurchases.length;
        }
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onRefund(purchaseId: string): void {
    if (!purchaseId) return;

    this.paymentService.refundPurchase(purchaseId).subscribe({
      next: () => {
        alert('Refund successful');
        this.loadStudentPurchases();
      },
      error: (err) => alert(err?.error?.message || 'Refund failed')
    });
  }

  canRefund(item: PurchaseItem): boolean {
    if (item.status !== 'purchased' || !item.purchasedAt) return false;

    const purchasedTime = new Date(item.purchasedAt).getTime();
    const now = Date.now();
    const diffMinutes = (now - purchasedTime) / 1000 / 60;

    return diffMinutes <= 5; // Refund allowed within 5 minutes
  }
}
