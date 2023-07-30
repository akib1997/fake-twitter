import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // If not authenticated, redirect to the login page or handle it as needed
      this.router.navigate(['/auth/login']); // Replace 'login' with your login page route
      return false;
    }
  }
}
