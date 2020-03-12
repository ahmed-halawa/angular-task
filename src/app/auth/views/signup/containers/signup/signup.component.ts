import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import * as fromModels from '../../../../../models';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.http.get('/api/v1/users').subscribe(users => {
      console.log({ users });
    });
  }

  onSubmit(user: Partial<fromModels.IUser>) {
    const url = '/api/v1/auth/signup';

    this.http.post(url, user).subscribe(() => {
      this.toastr.success('You have successfully signed up', 'Congrats', {
        timeOut: 4000,
        positionClass: 'toast-bottom-left'
      });
    });
  }
}
