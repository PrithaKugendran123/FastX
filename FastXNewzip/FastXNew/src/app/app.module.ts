import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './navbarComponent/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AdminDashboardComponent } from './module/admin/components/admin-dashboard/admin-dashboard.component';
import { OperatorAccountComponent } from './module/admin/components/operator-acc/operator-acc.component';
import { UserAccountComponent } from './module/admin/components/user-acc/user-acc.component';
import { RouteComponent } from './module/admin/components/bus-routes/bus-routes.component';
import { DisplayComponent } from './module/admin/components/bus-display/bus-display.component';
import { SeatComponent } from './Operator/seat/seat.component';
import { BookingComponent } from './Operator/booking/booking.component';
import { NavOpComponent } from './Operator/nav-op/nav-op.component';
import { ScheduleComponent } from './Operator/bus-schedule/bus-schedule.component';
import { TokenInterceptor } from './token.interceptor';
import { SidebarComponent } from './module/admin/components/sidebar/sidebar.component';
import { UserBookingComponent } from './User/user-booking/user-booking.component';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { SeatRegComponent } from './Operator/seat-reg/seat-reg.component';
import { BusScheduleRegComponent } from './Operator/bus-schedule-reg/bus-schedule-reg.component';

import { BusesPageComponent } from './User/buses-page/buses-page.component';
import { SeatAvailComponent } from './User/seat-avail/seat-avail.component';
import { FinalBookingComponent } from './User/final-booking/final-booking.component';
import { NavComponent } from './User/user-dashboard/nav/nav/nav.component';
import { AboutComponent } from './navbarComponent/about/about.component';
import { ContactComponent } from './navbarComponent/contact/contact.component';
import { FooterComponent } from './navbarComponent/footer/footer.component';
import { NavAdComponent } from './module/admin/nav-ad/nav-ad.component';
import { NavCommonComponent } from './navbarComponent/nav-common/nav-common.component';
import { OperatorDashboardComponent } from './Operator/operator-dashboard/operator-dashboard.component';
import { BusesComponent } from './module/admin/components/buses/buses.component';
import { PaymentComponent } from './User/payment/payment.component';
import { MybookingComponent } from './User/mybooking/mybooking.component';
import { ConbookingComponent } from './User/conbooking/conbooking.component';
import { MbookingComponent } from './User/mbooking/mbooking.component';
import { ProfileComponent } from './User/profile/profile.component';
import { OperatorLoginComponent } from './Operator/operator-login/operator-login.component';
import { AdminLoginComponent } from './module/admin/admin-login/admin-login.component';
import { DashComponent } from './Operator/dash/dash.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserAccComponent } from './Operator/user-acc/user-acc.component';







@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,

    AdminDashboardComponent,
    UserAccountComponent,
    OperatorAccountComponent,
    DisplayComponent,
    RouteComponent,
    SeatComponent,
    ScheduleComponent,
    BookingComponent,
   
    SidebarComponent,
    UserBookingComponent,
    UserDashboardComponent,
    SeatRegComponent,
    BusScheduleRegComponent,
   
    BusesPageComponent,
        NavOpComponent,
         SeatAvailComponent,
         FinalBookingComponent,
         NavComponent,
         AboutComponent,
         ContactComponent,
         FooterComponent,
         NavAdComponent,
         NavCommonComponent,
         OperatorDashboardComponent,
         BusesComponent,
         PaymentComponent,
         MybookingComponent,
         ConbookingComponent,
         MbookingComponent,
         ProfileComponent,
         OperatorLoginComponent,
         AdminLoginComponent,
         DashComponent,
         UserAccComponent
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    ToastrModule.forRoot() 

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
