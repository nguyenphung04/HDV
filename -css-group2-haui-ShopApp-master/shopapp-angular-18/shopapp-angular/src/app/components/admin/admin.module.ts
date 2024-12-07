import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order.admin.component';
import { DetailOrderAdminComponent } from './detail-order/detail.order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { UserAdminComponent } from './user/user.admin.component';
import { DetailUserAdminComponent } from './details-user/detail.user.admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    OrderAdminComponent,
    DetailOrderAdminComponent,
    DetailUserAdminComponent,
    ProductAdminComponent,
    UserAdminComponent,
  ],
  imports: [
    AdminRoutingModule, // import routes,
    CommonModule,
    FormsModule
  ]
})
export class AdminModule {}