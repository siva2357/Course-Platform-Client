import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/models/cart.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  isUpdating = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  cartItems: CartItem[] = [];
totalItems: number = 0;

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

loadCart() {
  this.isLoading = true;

  this.courseService.getFromCart().subscribe({
    next: (res: any) => {
      this.cartItems = res.items;
      this.totalItems = this.cartItems.length; // ✅ Recalculate here
      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to load cart';
      this.isLoading = false;
    }
  });
}


removeFromCart(cartItemId: string) {
  this.isLoading = true;

  this.courseService.removeFromCart(cartItemId).subscribe({
    next: () => {
      this.successMessage = 'Item removed successfully';
      this.loadCart(); // Optional: update cart in current component
      this.courseService.triggerCartUpdate(); // ✅ update header cart
      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to remove item';
      this.isLoading = false;
    }
  });
}



couponCode = '';
getCartTotal(): number {
  return this.cartItems.reduce((sum, item) => sum + item.amount, 0);
}

applyCoupon() {
  alert(`Coupon "${this.couponCode}" applied!`);
}

proceedToCheckout() {
  // Navigate to checkout
  this.router.navigate(['/checkout']);
}

    goToHome(){
      this.router.navigate([`/student`]);
    }

}
