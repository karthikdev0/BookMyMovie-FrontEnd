import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import 'bootstrap/dist/js/bootstrap.bundle';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { SeatSelectionModalComponent } from './seat-selection-modal/seat-selection-modal.component';
import { TicketBookingModalComponent } from './ticket-booking-modal/ticket-booking-modal.component';
import { SingleTicketComponent } from './ticket/single-ticket/single-ticket.component';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { MovieFilterComponent } from './movie-list/movie-filter/movie-filter.component';
import { RecommendedMoviesComponent } from './home/recommended-movies/recommended-movies.component';
import { FooterComponent } from './footer/footer.component';
import { WriteReviewComponent } from './dashboard/write-review/write-review.component';
import { MovieTicketBookingModule } from './movie-ticket-booking/movie-ticket-booking.module';







export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieListComponent,
    ErrorComponent,
    RegisterComponent,
    ConfirmationComponent,
    SeatSelectionModalComponent,
    TicketBookingModalComponent,
    SingleTicketComponent,
    ReviewModalComponent,
    MovieFilterComponent,
    RecommendedMoviesComponent,
    FooterComponent,
    WriteReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MovieTicketBookingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:['localhost:7254']
       // whitelistedDomains: ["localhost:5000"],
      //  blacklistedRoutes: []
      }
    }),
   
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
