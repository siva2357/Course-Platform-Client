import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/models/cart.model';
import { Purchase } from 'src/app/core/models/purchase.model';
import { CourseService } from 'src/app/core/services/course.service';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  couponCode = '';
  studentId!: string;

  constructor(
    private courseService: CourseService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentId = localStorage.getItem('userId') || '';
    if (this.studentId) {
      this.loadCart();
    } else {
      this.errorMessage = 'Student ID is missing. Please log in again.';
    }
  }

  loadCart() {
    this.isLoading = true;
    this.courseService.getFromCart().subscribe({
      next: (res: any) => {
        // Only include items that are not purchased
        this.cartItems = res.items;
        this.totalItems = this.cartItems.length;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load cart';
        this.isLoading = false;
      }
    });
  }

  removeFromCart(cartItemId: string) {
    if (!cartItemId) return;
    this.isLoading = true;
    this.courseService.removeFromCart(cartItemId).subscribe({
      next: () => {
        this.successMessage = 'Item removed successfully';
        this.loadCart();
        this.courseService.triggerCartUpdate();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to remove item';
        this.isLoading = false;
      }
    });
  }

  getCartTotal(): number {
    // Sum only items that are not purchased
    return this.cartItems
      .filter(item => item.purchaseStatus === 'in-cart')
      .reduce((sum, item) => sum + (item.amount || 0), 0);
  }

  applyCoupon() {
    if (!this.couponCode) return alert('Enter a coupon code');
    alert(`Coupon "${this.couponCode}" applied!`);
  }

  goToHome() {
    this.router.navigate(['/student']);
  }

  proceedToCheckout(cartItem?: CartItem) {
    const item = cartItem || this.cartItems.find(ci => ci.purchaseStatus === 'in-cart');
    if (!item) return alert('No items available for checkout');

    const purchase: Purchase = {
      courseId: item._id,
      courseTitle: item.courseTitle,
      courseThumbnail: item.courseThumbnail || '',
      amount: item.amount,
      status: 'purchased',
      platformFee: 0,
      revenueForInstructor: 0,
      revenueForAdmin: 0,
      refundCharges: 0,
      taxCharges: Math.round(item.amount * 0.10),
      purchasedAt: new Date().toISOString()
    };

    this.isLoading = true;
    this.paymentService.createOrder(purchase).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          purchase.orderId = res.data.id;
          this.paymentService.setSelectedProductForCheckout(purchase);
          this.removeFromCart(item._id);
          this.router.navigate(['/checkout', purchase.orderId]);
        } else {
          alert('Server error, cannot process order.');
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to create order';
        this.isLoading = false;
      }
    });
  }
}
