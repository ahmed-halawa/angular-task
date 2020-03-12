import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import * as fromContainers from './containers';

@NgModule({
  declarations: [...fromContainers.CONTAINERS],
  imports: [CommonModule, UsersRoutingModule]
})
export class UsersModule {}
