import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    public authService: AuthService,
    public spinnerService: SpinnerService
  ){
  }
}
