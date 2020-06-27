import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/auth/models/Usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: Usuario;

  @Output()
  sideBarCloseForMe = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  sideBarClose(){
    this.sideBarCloseForMe.emit();
  }
}
