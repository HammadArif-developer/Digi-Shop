import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminlayoutComponent
  },
  {
    path: 'login',
    component: LoginpageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
