import { Component, OnInit } from '@angular/core';
import * as fromModels from '../../../../../models';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSubmit(user: Partial<fromModels.IUser>) {
    console.log(user);
  }
}
