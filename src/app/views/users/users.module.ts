import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [...fromContainers.CONTAINERS, ...fromComponents.COMPONENTS],
  imports: [CommonModule, UsersRoutingModule]
})
export class UsersModule {}
