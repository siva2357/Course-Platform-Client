import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CourseService } from 'src/app/core/services/course.service';

// ------------------------------
// Types
// ------------------------------
type RangeType = 'Weekly' | 'Monthly' | 'Yearly';

interface CourseCategoryStats {
  category: string;
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
}

interface CoursePerformance {
  title: string;
  revenue: number;
  students: number;
}

export interface StudentPayment {
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  amount: number;
  purchasedAt: string;
  status: string;
}

interface InstructorSummary {
  totalRevenue: number;
  totalRefunds: number;
  totalOrders: number;
  totalStudents: number;
  weekly: { revenue: number; refunds: number; orders: number; students: number };
  monthly: { revenue: number; refunds: number; orders: number; students: number };
  yearly: { revenue: number; refunds: number; orders: number; students: number };
}

interface StatCardConfig {
  title: string;
  getValue: () => string;
  getRange: () => RangeType;
  updateRange: (range: RangeType) => void;
}

// ------------------------------
// Component
// ------------------------------
@Component({
  selector: 'app-instructor-dashboard-page',
  templateUrl: './instructor-dashboard-page.component.html',
  styleUrls: ['./instructor-dashboard-page.component.css']
})
export class InstructorDashboardPageComponent implements OnInit {

  // ------------------------------
  // ViewChild references for charts
  // ------------------------------
  @ViewChild('categoryChart') categoryChart!: BaseChartDirective;
  @ViewChild('performanceChart') performanceChart!: BaseChartDirective;

  // ------------------------------
  // Dashboard data
  // ------------------------------
  summaryStats: { label: string; value: string | number }[] = [];
  categoryStats: CourseCategoryStats[] = [];
  performanceStats: CoursePerformance[] = [];
  recentPurchases: StudentPayment[] = [];

  // ------------------------------
  // Range states
  // ------------------------------
  selectedRevenueRange: RangeType = 'Weekly';
  selectedOrderRange: RangeType = 'Weekly';
  selectedRefundRange: RangeType = 'Weekly';
  selectedStudentRange: RangeType = 'Weekly';

  revenueData: Record<RangeType, string> = { Weekly: '₹0', Monthly: '₹0', Yearly: '₹0' };
  orderCountData: Record<RangeType, string> = { Weekly: '0', Monthly: '0', Yearly: '0' };
  refundData: Record<RangeType, string> = { Weekly: '₹0', Monthly: '₹0', Yearly: '₹0' };
  studentCountData: Record<RangeType, string> = { Weekly: '0', Monthly: '0', Yearly: '0' };

  // ------------------------------
  // Computed getters for cards
  // ------------------------------
  get revenueAmount() { return this.revenueData[this.selectedRevenueRange]; }
  get refundAmount() { return this.refundData[this.selectedRefundRange]; }
  get studentCount() { return this.studentCountData[this.selectedStudentRange]; }
  get orderCount() { return this.orderCountData[this.selectedOrderRange]; }

  // ------------------------------
  // Cards configuration
  // ------------------------------
  cards: StatCardConfig[] = [];


  // ------------------------------
// Chart data & options
// ------------------------------

// Pie Chart: Courses by Category
public courseCategoryChartData: ChartData<'pie', number[], string> = {
  labels: [],
  datasets: []
};

public courseCategoryChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.label}: ${ctx.raw} courses`
      }
    }
  }
};

// Bar Chart: Course Performance
public coursePerformanceChartData: ChartData<'bar', number[], string> = {
  labels: [],
  datasets: []
};

public coursePerformanceChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    tooltip: { mode: 'index', intersect: false }
  },
  scales: {
    x: { stacked: false },
    yStudents: {
      type: 'linear',
      position: 'left',
      beginAtZero: true,
      title: { display: true, text: 'Students' }
    },
    yRevenue: {
      type: 'linear',
      position: 'right',
      beginAtZero: true,
      title: { display: true, text: 'Revenue (₹)' },
      grid: { drawOnChartArea: false }
    }
  }
};


  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.initCards();
    this.loadSummary();
    this.loadCharts();
    this.loadRecentPurchases();
  }

  // ------------------------------
  // Initialize summary cards
  // ------------------------------
  initCards() {
    this.cards = [
      {
        title: 'TOTAL REVENUE',
        getValue: () => this.revenueAmount,
        getRange: () => this.selectedRevenueRange,
        updateRange: this.updateRevenueRange.bind(this)
      },
      {
        title: 'TOTAL REFUNDS',
        getValue: () => this.refundAmount,
        getRange: () => this.selectedRefundRange,
        updateRange: this.updateRefundRange.bind(this)
      },
      {
        title: 'ACTIVE STUDENTS',
        getValue: () => this.studentCount,
        getRange: () => this.selectedStudentRange,
        updateRange: this.updateStudentRange.bind(this)
      },
      {
        title: 'ALL TIME ORDERS',
        getValue: () => this.orderCount,
        getRange: () => this.selectedOrderRange,
        updateRange: this.updateOrderRange.bind(this)
      }
    ];
  }

  // ------------------------------
  // Card label helper
  // ------------------------------
  getCardLabel(title: string, range: RangeType): string {
    const rangeText = range.toLowerCase();
    switch (title) {
      case 'TOTAL REVENUE': return `Earnings this ${rangeText}`;
      case 'TOTAL REFUNDS': return `Refunds this ${rangeText}`;
      case 'ALL TIME ORDERS': return `Orders this ${rangeText}`;
      case 'ACTIVE STUDENTS': return `Students joined this ${rangeText}`;
      default: return '';
    }
  }

  // ------------------------------
  // Range update handlers
  // ------------------------------
  updateRevenueRange(range: RangeType) { this.selectedRevenueRange = range; }
  updateRefundRange(range: RangeType) { this.selectedRefundRange = range; }
  updateStudentRange(range: RangeType) { this.selectedStudentRange = range; }
  updateOrderRange(range: RangeType) { this.selectedOrderRange = range; }

  // ------------------------------
  // Load instructor summary
  // ------------------------------
  loadSummary() {
    this.courseService.getInstructorSummaryAnalytics().subscribe((data: InstructorSummary) => {
      this.summaryStats = [
        { label: 'Total Revenue', value: `₹${data.totalRevenue}` },
        { label: 'Total Refunds', value: `₹${data.totalRefunds}` },
        { label: 'Total Orders', value: data.totalOrders },
        { label: 'Total Students', value: data.totalStudents }
      ];

      this.revenueData = {
        Weekly: `₹${data.weekly.revenue}`,
        Monthly: `₹${data.monthly.revenue}`,
        Yearly: `₹${data.yearly.revenue}`
      };
      this.orderCountData = {
        Weekly: `${data.weekly.orders}`,
        Monthly: `${data.monthly.orders}`,
        Yearly: `${data.yearly.orders}`
      };
      this.refundData = {
        Weekly: `₹${data.weekly.refunds}`,
        Monthly: `₹${data.monthly.refunds}`,
        Yearly: `₹${data.yearly.refunds}`
      };
      this.studentCountData = {
        Weekly: `${data.weekly.students}`,
        Monthly: `${data.monthly.students}`,
        Yearly: `${data.yearly.students}`
      };
    });
  }

  // ------------------------------
  // Load charts
  // ------------------------------
loadCharts() {
  this.courseService.getInstructorChartAnalytics().subscribe({
    next: data => {
      this.categoryStats = data.categoryStats || [];
      this.performanceStats = data.performanceStats || [];

      // Pie chart: Courses by category
      this.courseCategoryChartData = {
        labels: this.categoryStats.map(c => c.category),
        datasets: [{
          data: this.categoryStats.map(c => c.totalCourses),
          backgroundColor: this.categoryStats.map(() => this.getRandomColor()),
          borderWidth: 1
        }]
      };

      // Pie chart options
      this.courseCategoryChartOptions = {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { enabled: true }
        }
      };

      // Bar chart: Performance
      this.coursePerformanceChartData = {
        labels: this.performanceStats.map(p => p.title),
        datasets: [
          {
            label: 'Students',
            data: this.performanceStats.map(p => p.students),
            yAxisID: 'yStudents',
            backgroundColor: 'rgba(0,123,255,0.6)',
            borderColor: 'rgba(0,123,255,1)',
            borderWidth: 1
          },
          {
            label: 'Revenue',
            data: this.performanceStats.map(p => p.revenue),
            yAxisID: 'yRevenue',
            backgroundColor: 'rgba(40,167,69,0.6)',
            borderColor: 'rgba(40,167,69,1)',
            borderWidth: 1
          }
        ]
      };

      // Bar chart options
      this.coursePerformanceChartOptions = {
        responsive: true,
        scales: {
          yStudents: { position: 'left' },
          yRevenue: { position: 'right' }
        },
        plugins: {
          legend: { position: 'top' },
          tooltip: { enabled: true }
        }
      };

      // No need to call update() in ng2-charts v4+
    },
    error: err => console.error('Chart data load error:', err)
  });
}


  // ------------------------------
  // Generate random color for pie chart
  // ------------------------------
  getRandomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.6)`;
  }

  // ------------------------------
  // Load recent purchases
  // ------------------------------
  loadRecentPurchases() {
    this.courseService.getInstructorPurchaseSummary().subscribe({
      next: res => this.recentPurchases = res.purchases || [],
      error: err => { console.error('Recent Purchases Error:', err); this.recentPurchases = []; }
    });
  }
}
