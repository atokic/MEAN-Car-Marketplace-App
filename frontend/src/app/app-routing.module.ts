import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { CarItemComponent } from './pages/car-item/car-item.component';

import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'car-ads', component: CarAdsComponent },
  { path: 'my-ads', component: MyAdsComponent, canActivate: [AuthGuard]  },
  { path: 'add-car', component: AddCarComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'user' } },
  { path: 'car/:id', component: CarItemComponent },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'users-reports', component: UsersReportsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]  },
  { path: 'unauthorized', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
