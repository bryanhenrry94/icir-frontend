import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from 'protractor';

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

  sideBarToggle(event: EventEmitter){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
