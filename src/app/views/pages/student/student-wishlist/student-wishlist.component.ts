
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { WishList } from 'src/app/core/models/cart.model';
import { CourseService } from 'src/app/core/services/course.service';
@Component({
  selector: 'app-student-wishlist',
  templateUrl: './student-wishlist.component.html',
  styleUrls: ['./student-wishlist.component.css']
})
export class StudentWishlistComponent {
    isUpdating = false;
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    wishlistItems: WishList[] = [];
  totalItems: number = 0;

    constructor(
      private courseService: CourseService,
      private router: Router
    ) {}

    ngOnInit() {
      this.loadWishlist();
    }

 loadWishlist() {
    this.isLoading = true;

    this.courseService.getFromWishlist().subscribe({
      next: (res: any) => {
        this.wishlistItems = res.items;
        this.totalItems = this.wishlistItems.length; // ✅ Recalculate here
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load cart';
        this.isLoading = false;
      }
    });
  }


removeFromWishlist(wishlistItemId: string) {
  this.isLoading = true;

  this.courseService.removeFromWishlist(wishlistItemId).subscribe({
    next: () => {
      this.successMessage = 'Item removed successfully';
      this.loadWishlist();
      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to remove item';
      this.isLoading = false;
    }
  });
}




  goToCart(courseId: string): void  {
  this.courseService.addToCart(courseId).subscribe({
    next: (res) => {
      console.log('Cart add response:', res);
      // 🔔 Notify header to refresh cart count
      this.courseService.triggerCartUpdate(); // << ADD THIS LINE
    },
    error: (err) => {
      console.error('Add to cart error:', err);
    }
  });
}


goToCourse(course: WishList): void {
  if (!course?.courseTitle || !course?.courseId) {
    console.error('Course title or ID missing');
    return;
  }

  const slug = this.slugify(course.courseTitle);
  this.router.navigate(['/student/course/learning', slug, 'home'], {
    queryParams: { courseId: course.courseId } // ✅ use courseId here
  });
}

// Optional slugify function (basic)
slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, '');   // remove leading/trailing hyphens
}




    }
