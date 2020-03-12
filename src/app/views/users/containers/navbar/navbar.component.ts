import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
