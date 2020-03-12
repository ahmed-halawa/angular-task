import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [...fromContainers.CONTAINERS, ...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ToastrModule,
    ReactiveFormsModule
  ]
})
export class SignupModule {}
