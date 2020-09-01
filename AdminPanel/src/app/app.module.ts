import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { AddvendorComponent } from './pages/addvendor/addvendor.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddcategoriesComponent } from './pages/addcategories/addcategories.component';
import { FeaturedproductComponent } from './pages/featuredproduct/featuredproduct.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SaleComponent } from './pages/sale/sale.component';
import { TotalsalesComponent } from './pages/totalsales/totalsales.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginLayoutComponent, VendorComponent, AddvendorComponent, CategoriesComponent, AddcategoriesComponent, FeaturedproductComponent, OrdersComponent, SaleComponent, TotalsalesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
