import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [...fromContainers.CONTAINERS, ...fromComponents.COMPONENTS],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, SharedModule]
})
export class LoginModule {}
