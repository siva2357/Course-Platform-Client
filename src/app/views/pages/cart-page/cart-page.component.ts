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
  totalItems = 0;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private courseService: CourseService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;
    this.courseService.getFromCart().subscribe({
      next: (res: any) => {
        // Only include items that are still in-cart
        this.cartItems = res.items.filter((i: CartItem) => i.purchaseStatus === 'in-cart');
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
    return this.cartItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  }



  goToHome() {
    this.router.navigate(['/student']);
  }

proceedToCheckout(cartItem?: CartItem) {
  const item = cartItem || this.cartItems[0];
  if (!item) return alert('No items available for checkout');

  const purchase: Purchase = {
    courseId: item.courseId,
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

  // ✅ Create order on backend
  this.paymentService.createOrder(purchase).subscribe({
    next: (res: any) => {
      if (res.status === 200) {
        purchase.orderId = res.data.id;

        // ✅ Save purchase for Checkout page
        this.paymentService.setSelectedProductForCheckout(purchase);

        // ✅ Navigate to checkout AFTER storing purchase
        this.router.navigate(['/checkout', purchase.orderId]);

        // ✅ Remove from cart only after order is successfully created
        this.courseService.removeFromCart(item._id).subscribe({
          next: () => this.courseService.triggerCartUpdate(),
          error: () => console.error('Failed to remove item from cart')
        });
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
