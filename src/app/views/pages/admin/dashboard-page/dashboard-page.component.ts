import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminDashboardStats } from 'src/app/core/models/stats.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  stats!: AdminDashboardStats;
  errorMessage: string | null = null;

  generalStats: { title: string; count: number }[] = [];
  revenueCards: { title: string; amount: number }[] = [];

  // Pie chart: Courses by status
  courseStatusChartData: ChartData<'pie', number[], string> = { labels: [], datasets: [{ data: [] }] };
  courseStatusChartOptions: ChartOptions<'pie'> = { responsive: true, plugins: { legend: { position: 'bottom' } } };

  // Bar chart: Top courses by revenue
  topCoursesChartData: ChartData<'bar', number[], string> = { labels: [], datasets: [{ label: 'Revenue', data: [] }] };
  topCoursesChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  constructor(private userService: UserService ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  /** Load stats from API */
  private loadStatistics() {
    this.userService.getCompleteStats().subscribe({
      next: (res: AdminDashboardStats) => {
        this.stats = res;
        this.prepareGeneralStats();
        this.prepareRevenueCards();
        this.prepareCharts();
      },
      error: (err) => {
        console.error('Failed to load stats', err);
        this.errorMessage = 'Failed to load statistics. Please try again later.';
      }
    });
  }

  /** General stats cards */
  private prepareGeneralStats() {
    if (!this.stats) return;
    this.generalStats = [
      { title: 'Total Instructors', count: this.stats.totalInstructors },
      { title: 'Total Students', count: this.stats.totalStudents },
      { title: 'Total Courses', count: this.stats.totalCourses },
      { title: 'Total Purchases', count: this.stats.totalPurchases }
    ];
  }

  /** Revenue cards */
  private prepareRevenueCards() {
    if (!this.stats) return;
    this.revenueCards = [
      { title: 'Total Sales', amount: this.stats.revenueStats.totalSales },
      { title: 'Instructor Earnings', amount: this.stats.revenueStats.totalInstructorEarnings },
      { title: 'Refund Amount', amount: this.stats.revenueStats.totalRefundedAmount },
      { title: 'Refund Charges', amount: this.stats.revenueStats.totalRefundCharges },
      { title: 'Tax Charges', amount: this.stats.revenueStats.totalTaxCollected },
      { title: 'Platform Revenue', amount: this.stats.revenueStats.totalRevenueForAdmin }
    ];
  }

  /** Prepare charts */
  private prepareCharts() {
    if (!this.stats) return;

    // Pie chart: courses by status
    this.courseStatusChartData = {
      labels: ['Draft', 'Pending', 'Published', 'Rejected'],
      datasets: [{
        data: [
          this.stats.courseStatus.Draft,
          this.stats.courseStatus.Pending,
          this.stats.courseStatus.Published,
          this.stats.courseStatus.Rejected
        ]
      }]
    };

    // Bar chart: top courses by revenue
    this.topCoursesChartData = {
      labels: this.stats.topCourses.map(c => c.courseTitle),
      datasets: [{
        label: 'Revenue',
        data: this.stats.topCourses.map(c => c.revenue)
      }]
    };
  }
}
