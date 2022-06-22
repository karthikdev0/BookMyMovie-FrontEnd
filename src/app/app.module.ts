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
import { MovieTicketBookingComponent } from './movie-ticket-booking/movie-ticket-booking.component';
//import { MovieComponent } from './movie/movie.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
//import { UploadComponent } from './movie/upload/upload.component';
import { MyAccountComponent } from './dashboard/my-account/my-account.component';
import { AllTicketDetailsComponent } from './dashboard/all-ticket-details/all-ticket-details.component';
import { InsertMovieRecordComponent } from './dashboard/insert-movie-record/insert-movie-record.component';
import {MovieComponent} from './dashboard/insert-movie-record/movie/movie.component';
import { UploadComponent } from './dashboard/insert-movie-record/movie/upload/upload.component';
import { EditMovieComponent } from './dashboard/edit-movie/edit-movie.component';
import { MovieTheatreDetailsComponent } from './movie-ticket-booking/movie-theatre-details/movie-theatre-details.component';
import { TicketBookingFormComponent } from './movie-ticket-booking/ticket-booking-form/ticket-booking-form.component';
import { MyReviewsComponent } from './dashboard/my-reviews/my-reviews.component';
import { MovieReviewsComponent } from './movie-ticket-booking/movie-reviews/movie-reviews.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import 'bootstrap/dist/js/bootstrap.bundle';
import { SeatSelectionComponent } from './movie-ticket-booking/ticket-booking-form/seat-selection/seat-selection.component';
import { TicketComponent } from './movie-ticket-booking/ticket/ticket.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { SeatSelectionModalComponent } from './seat-selection-modal/seat-selection-modal.component';
import { TicketBookingModalComponent } from './ticket-booking-modal/ticket-booking-modal.component';
import { SingleTicketComponent } from './ticket/single-ticket/single-ticket.component';
import { SingleBookedTicketComponent } from './movie-ticket-booking/ticket/single-booked-ticket/single-booked-ticket.component';
import { WriteReviewComponent } from './dashboard/write-review/write-review.component';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { MovieFilterComponent } from './movie-list/movie-filter/movie-filter.component';
import { MovieRecommendationComponent } from './movie-ticket-booking/movie-recommendation/movie-recommendation.component';
import { RecommendedMoviesComponent } from './home/recommended-movies/recommended-movies.component';
import { FooterComponent } from './footer/footer.component';
import { ChartsComponent } from './dashboard/charts/charts.component';
import { PieChartComponent } from './dashboard/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './dashboard/charts/line-chart/line-chart.component';
import { StockChartComponent } from './dashboard/charts/stock-chart/stock-chart.component';






export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieListComponent,
    MovieTicketBookingComponent,
    MovieComponent,
    ErrorComponent,
    DashboardComponent,
    RegisterComponent,
    UploadComponent,
    MyAccountComponent,
    AllTicketDetailsComponent,
    InsertMovieRecordComponent,
    EditMovieComponent,
    MovieTheatreDetailsComponent,
    TicketBookingFormComponent,
    MyReviewsComponent,
    MovieReviewsComponent,
    SeatSelectionComponent,
    TicketComponent,
    ConfirmationComponent,
    SeatSelectionModalComponent,
    TicketBookingModalComponent,
    SingleTicketComponent,
    SingleBookedTicketComponent,
    WriteReviewComponent,
    ReviewModalComponent,
    MovieFilterComponent,
    MovieRecommendationComponent,
    RecommendedMoviesComponent,
    FooterComponent,
    ChartsComponent,
    PieChartComponent,
    LineChartComponent,
    StockChartComponent
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
