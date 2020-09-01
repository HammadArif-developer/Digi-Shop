import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryDescriptionComponent } from './category-description/category-description.component';
import { CartitemsComponent } from './cartitems/cartitems.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'productdescription', component: CategoryDescriptionComponent},
  {path: 'categories', component: CategoriesPageComponent},
  {path: 'cartitems', component: CartitemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
