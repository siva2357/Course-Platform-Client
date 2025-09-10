import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from 'src/app/core/models/purchase.model';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  razorPayKey: any;
  selectedProduct: Purchase | null = null;
  coursePrice: number = 0;
  taxCharges: number = 0;
  totalPaid: number = 0;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRazorPayKey();
    this.listenSelectedProduct();
  }

  getRazorPayKey() {
    this.razorPayKey = this.paymentService.getRazorPayKey();
  }

  listenSelectedProduct() {
    const product = this.paymentService.getSelectedProductForCheckout();
    if (product) {
      this.selectedProduct = product;
      // Calculate prices
this.coursePrice = Number(product.amount);
this.taxCharges = Number(product.taxCharges || 0);
this.totalPaid = this.coursePrice + this.taxCharges;

    } else {
      console.warn('No product found for checkout');
      this.router.navigateByUrl('/courses');
    }
  }

getOrderId() {
  return this.route.snapshot.params['paymentOrderId'];
}


  payWithRazorpay() {
    if (!this.selectedProduct) return;

    const paymentOrderId = this.getOrderId();
    const options: any = {
      key: this.razorPayKey,
      amount: this.coursePrice * 100, // charge only course price
      currency: 'INR',
      name: 'Brogrammers Shop',
      description: '',
      image: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1747194045/logo_t8fmwx.png',
      order_id: paymentOrderId,
      theme: { color: '#ddcbff' },
      handler: (response: any) => {
        this.paymentService.verifyPaymentSignature(response, paymentOrderId)
          .subscribe((res: any) => {
            if (res.data.isPaymentVerified) {
              this.paymentService.getPurchaseByOrderId(paymentOrderId).subscribe((purchase: Purchase) => {
                this.paymentService.setSelectedProductForCheckout(purchase);
                this.router.navigateByUrl('/student/my-courses');
              }, () => alert('Payment verified but could not fetch purchase details.'));
            } else {
              this.router.navigateByUrl(`/checkout/${paymentOrderId}`);
            }
          });
      },
      modal: {
        escape: false,
        ondismiss: () => {
          alert('Transaction has been cancelled.');
          this.router.navigateByUrl(`/checkout/${paymentOrderId}`);
        }
      }
    };

    const rzp = new this.paymentService.nativeWindow.Razorpay(options);
    rzp.on('payment.failed', () => this.router.navigateByUrl(`/checkout/${paymentOrderId}`));
    rzp.open();
  }
}
