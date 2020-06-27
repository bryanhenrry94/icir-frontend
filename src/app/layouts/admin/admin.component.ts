import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sideBarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggle(event: EventEmitter<any>){
    this.sideBarOpen = !this.sideBarOpen;
  }

  close(){
    this.sideBarOpen = false;
  }
}
