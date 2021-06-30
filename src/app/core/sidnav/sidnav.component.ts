import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent implements OnInit {

  sidenavWidth = 4;
  ngStyle: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  // sidenavToggle() {
  //   this.ngStyle = 'this.sidenavWidth = 15';
  //   console.log('sidenav width incrases');
  // }

}
