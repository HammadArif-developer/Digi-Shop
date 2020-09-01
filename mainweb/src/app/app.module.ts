import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CategoryDescriptionComponent } from './category-description/category-description.component';
import { CartitemsComponent } from './cartitems/cartitems.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderInterceptor } from './loader.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    NavbarMobileComponent,
    MainBodyComponent,
    FooterComponent,
    CategoriesPageComponent,
    CategoryDescriptionComponent,
    CartitemsComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule,
    NgImageSliderModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,useClass: LoaderInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
