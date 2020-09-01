import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { AddproductComponent } from 'src/app/pages/addproduct/addproduct.component';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { AddvendorComponent } from 'src/app/pages/addvendor/addvendor.component';
import { VendorComponent } from 'src/app/pages/vendor/vendor.component';
import { AddcategoriesComponent } from 'src/app/pages/addcategories/addcategories.component';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { FeaturedproductComponent } from 'src/app/pages/featuredproduct/featuredproduct.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { SaleComponent } from 'src/app/pages/sale/sale.component';
import { TotalsalesComponent } from 'src/app/pages/totalsales/totalsales.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  // { path: "dashboard", component: DashboardComponent },
  // { path: "icons", component: IconsComponent },
  // // { path: "maps", component: MapComponent },
  // { path: "notifications", component: NotificationsComponent },
  // { path: "user", component: UserComponent },
  // { path: "tables", component: TablesComponent },
  // { path: "typography", component: TypographyComponent },
  { path: "addproduct", component: AddproductComponent  },
  { path: "product", component: ProductComponent },
  { path: "addvendor", component: AddvendorComponent  },
  { path: "vendor", component: VendorComponent },
  { path: "addcategory", component: AddcategoriesComponent  },
  { path: "category", component: CategoriesComponent },
  { path: "addfeaturedcategory",component: AddcategoriesComponent},
  { path: "featuredproduct", component: FeaturedproductComponent},
  { path: "orders", component: OrdersComponent},
  { path: "sales", component: SaleComponent},
  { path: "totalsales", component: TotalsalesComponent}
  // { path: "rtl", component: RtlComponent }
];
