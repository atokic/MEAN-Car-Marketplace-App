import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CarAdsComponent } from './pages/car-ads/car-ads.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MyAdsComponent } from './pages/my-ads/my-ads.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { UsersReportsComponent } from './pages/users-reports/users-reports.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyProfileDialogComponent } from './components/my-profile-dialog/my-profile-dialog.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { CarItemComponent } from './pages/car-item/car-item.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CarEditDialogComponent } from './components/car-edit-dialog/car-edit-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FilterComponent } from './components/filter/filter.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    SignupComponent,
    CarAdsComponent,
    UsersComponent,
    NotFoundComponent,
    MyAdsComponent,
    ReportsComponent,
    UsersReportsComponent,
    UserEditDialogComponent,
    MyProfileComponent,
    MyProfileDialogComponent,
    AddCarComponent,
    CarItemComponent,
    ConfirmDialogComponent,
    CarEditDialogComponent,
    SearchComponent,
    LoaderComponent,
    FilterComponent,
    MobileMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
