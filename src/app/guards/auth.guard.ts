import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  canActivate()
  {
    if(this.authService.loggedIn())
    {
      return true;
    }
    else{
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
