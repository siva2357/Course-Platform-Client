import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {

  loading = true;
  purchaseSummary: any[] = [];
  filteredSummary: any[] = [];
  totalLength = 0;
  errorMessage: string | null = null;

  adminId!: string;

  // 🔹 Hardcoded filter values
  categories: string[] = ['Design', 'Development', 'Marketing', 'Business'];
  statuses: string[] = ['Purchased', 'Refunded', 'Non-Refundable'];

  // Filter selections
  filterCategory = '';
  filterStatus = '';
  filterMonth = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.adminId = localStorage.getItem('userId') || '';
    if (this.adminId) {
      this.loadPurchaseSummary();
    } else {
      this.errorMessage = 'Admin ID is missing. Please log in again.';
      this.loading = false;
    }
  }

  loadPurchaseSummary(): void {
    this.paymentService.getPurchaseSummary().subscribe({
      next: (res) => {
        this.purchaseSummary = res.data.map(p => {
          const d = new Date(p.purchasedAt);
          const month = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}`;
          return { ...p, month };
        });
        this.filteredSummary = [...this.purchaseSummary]; // initially show all
        this.totalLength = this.filteredSummary.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading purchases:', err);
        this.errorMessage = 'Failed to load purchase summary';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredSummary = this.purchaseSummary.filter(p => {
      return (!this.filterCategory || p.courseCategory === this.filterCategory)
          && (!this.filterStatus || p.statusLabel === this.filterStatus)
          && (!this.filterMonth || p.month === this.filterMonth);
    });
    this.totalLength = this.filteredSummary.length;
  }

  resetFilters() {
    this.filterCategory = '';
    this.filterStatus = '';
    this.filterMonth = '';
    this.filteredSummary = [...this.purchaseSummary]; // restore all
    this.totalLength = this.filteredSummary.length;
  }
}
