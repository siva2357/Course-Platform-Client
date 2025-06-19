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
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
selectedProduct: Purchase | null = null;
  ngOnInit() {
    this.getRazorPayKey();
    this.listenSelectedProduct();
    this.getOrderId();
  }
getRazorPayKey() {
  this.razorPayKey = this.paymentService.getRazorPayKey();
}

  getOrderId() {
    return this.route.snapshot.params['paymentOrderId'];
  }
listenSelectedProduct() {
  const product = this.paymentService.getSelectedProductForCheckout();
  if (product) {
    this.selectedProduct = product;
  } else {
    // Optional: Redirect or show error
    console.warn('No product found for checkout');
    this.router.navigateByUrl('/courses'); // or any fallback route
  }
}


payWithRazorpay() {
  const paymentOrderId = this.getOrderId();
  const options: any = {
    key: this.razorPayKey,
    amount: Number(this.selectedProduct?.amount ?? 0) * 100,
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
          this.router.navigateByUrl('/paymentsuccess');
        }, () => {
          alert('Payment verified but could not fetch purchase details.');
        });
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

  rzp.on('payment.failed', () => {
    this.router.navigateByUrl(`/checkout/${paymentOrderId}`);
  });

  rzp.open();
}



}
