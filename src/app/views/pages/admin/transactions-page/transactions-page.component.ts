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


    /** Pagination */
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  totalEntries = 0;
  pageNumbers: number[] = [];

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
      this.purchaseSummary = res.data.map((p: any) => {
        const d = new Date(p.purchasedAt);
        const month = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}`;

        return {
          purchaseId: p.purchaseId,
          amount: p.studentPaid,                  // ✅ total paid
          coursePrice: p.coursePrice,
          taxCharges: p.taxCharges,
          platformFee: p.platformFee,
          revenueForInstructor: p.revenueForInstructor,
          revenueForAdmin: p.revenueForAdmin,
          refundedAmount: p.refundedAmount,
          refundCharges: p.refundCharges,
          purchasedAt: d,
          month,                                  // ✅ YYYY-MM
          statusLabel: p.status,                  // ✅ normalize status
          courseTitle: p.courseTitle,
          courseThumbnail: p.courseThumbnail,
          courseCategory: p.courseCategory,
          studentName: p.studentName,
          studentEmail: p.studentEmail,
          courseInstructorName: p.instructorName, // ✅ mapped
          courseInstructorEmail: p.instructorEmail  // ✅ fallback
        };
      });

      this.filteredSummary = [...this.purchaseSummary];
      this.totalLength = this.filteredSummary.length;
       this.updatePagination();
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






  /** Pagination Methods */
  updatePagination(): void {
    this.totalEntries = this.filteredSummary.length;
    this.totalPages = Math.max(Math.ceil(this.totalEntries / this.itemsPerPage), 1);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.paginateStudents();
  }

  paginateStudents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.purchaseSummary = this.filteredSummary.slice(startIndex, startIndex + this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateStudents();
  }

  getStartIndex(): number {
    return this.totalEntries ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }




}
