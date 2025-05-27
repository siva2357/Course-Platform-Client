import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-confirmation-page',
  templateUrl: './account-confirmation-page.component.html',
  styleUrls: ['./account-confirmation-page.component.css']
})
export class AccountConfirmationPageComponent implements OnInit {
  email: string = '';
  role: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.role = params['role'];

      if (this.role) {
        localStorage.setItem('userRole', this.role.toLowerCase());
      }
    });
  }

  login(): void {
    const role = this.role.toLowerCase();
    if (role === 'instructor') {
      this.router.navigate(['/instructor/login-page']);
    } else if (role === 'student') {
      this.router.navigate(['/student/login-page']);
    }
  }
}
