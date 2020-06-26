import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  toggleSideBarForMe = new EventEmitter<any>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }
}
