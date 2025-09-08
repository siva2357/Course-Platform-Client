import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentUserRole = this.authService.getRole();

    if (currentUserRole === expectedRole) {
      return true; // Access granted
    } else {
      this.router.navigate(['login']);
      return false; // Access denied
    }
  }
}
