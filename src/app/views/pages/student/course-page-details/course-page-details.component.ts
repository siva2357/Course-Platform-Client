import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/core/models/purchase.model';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-course-page-details',
  templateUrl: './course-page-details.component.html',
  styleUrls: ['./course-page-details.component.css']
})
export class CoursePageDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('courseVideo') courseVideo!: ElementRef<HTMLVideoElement>;
  showOverlay: boolean = true;
courseId!: string;
course!: Course;
isInCart: boolean = false;
isInWishlist:boolean=false;
  successMessage!: string;
  errorMessage!: string;
  wishlistCourseIds: string[] = [];
  wishlistItemId: string = '';
    hasAccess = false;

   isLoading = false;
  constructor(private router: Router, private courseService:CourseService, private route: ActivatedRoute, private paymentService:PaymentService) {}

ngOnInit() {
  const courseId = this.route.snapshot.paramMap.get('id');
  if (!courseId) {
    console.error('Course ID not found');
    return;
  }

  // Fetch course first
  this.courseService.getCourseById(courseId).subscribe(course => {
    this.course = course;

    // Check if in cart
    this.courseService.getFromCart().subscribe(cart => {
      this.isInCart = cart.items.some(
        item => item.courseTitle === this.course.landingPage.courseTitle
      );
    });

    // Check if in wishlist
    this.courseService.getFromWishlist().subscribe(wishList => {
      const item = wishList.items.find(
        item => item.courseTitle === this.course.landingPage.courseTitle
      );

      if (item) {
        this.isInWishlist = true;
        this.wishlistItemId = item._id;
      } else {
        this.isInWishlist = false;
        this.wishlistItemId = '';
      }
    });

    // ✅ Now check course access
    this.paymentService.checkCourseAccess(courseId).subscribe(res => {
      this.hasAccess = res.access;
    });
  });
}



  ngAfterViewInit(): void {
    const modalElement = document.getElementById('videoModal');
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.resetVideo();
      });
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/student']);
  }

  playVideo(): void {
    const video = this.courseVideo.nativeElement;
    video.play();
    this.showOverlay = false;
  }



  closeModal(): void {
    this.resetVideo();
  }


  private resetVideo(): void {
    const video = this.courseVideo.nativeElement;
    video.pause();
    video.currentTime = 0;
    this.showOverlay = true;
  }



handleAddToCart(courseId: string): void {
  this.courseService.addToCart(courseId).subscribe({
    next: (res) => {
      console.log('Cart add response:', res);
      this.isInCart = true; // ✅ Immediately switch to "Go to Cart"

      // 🔔 Notify header to refresh cart count
      this.courseService.triggerCartUpdate(); // << ADD THIS LINE
    },
    error: (err) => {
      console.error('Add to cart error:', err);
    }
  });
}


handleWishlist(courseId: string) {
  this.courseService.addToWishlist(courseId).subscribe({
    next: (res) => {
      console.log('Cart add response:', res);
      this.isInWishlist= true; // ✅ Immediately switch to "Go to Cart"

    },
    error: (err) => {
      console.error('Add to cart error:', err);
    }
  });
}

   removeFromWishlist(wishlistItemId: string) {
      this.isLoading = true;

      this.courseService.removeFromWishlist(wishlistItemId).subscribe({
        next: () => {
          this.successMessage = 'Item removed successfully';
          this.isInWishlist=false;
        },
        error: () => {
          this.errorMessage = 'Failed to remove item';
          this.isLoading = false;
        }
      });
    }

// buyNow(id: string) {
//   this.router.navigate(['checkout', id]);
// }

buyNow(course: Course) {
  const purchase: Purchase = {
    courseId: course._id!,
    courseTitle: course.landingPage.courseTitle,
    amount: Number(course.price.amount) || 0, // ✅ force conversion to number
    status: 'purchased' // optional, backend will default
  };

  this.paymentService.createOrder(purchase).subscribe((response: any) => {
    if (response.status === 200) {
      const paymentOrderId = response.data.id;
      this.paymentService.setSelectedProductForCheckout(purchase);
      console.log('Navigating to checkout with order id:', paymentOrderId);
      this.router.navigate(['/checkout', paymentOrderId]);
    } else {
      alert('Server side error, cannot process order');
    }
  });
}



}
