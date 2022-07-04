import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "../material/material.module";
import { MovieRecommendationComponent } from "./movie-recommendation/movie-recommendation.component";
import { MovieReviewsComponent } from "./movie-reviews/movie-reviews.component";
import { MovieTheatreDetailsComponent } from "./movie-theatre-details/movie-theatre-details.component";
import { MovieTicketBookingRoutingModule } from "./movie-ticket-booking-routing.module";
import { MovieTicketBookingComponent } from "./movie-ticket-booking.component";
import { SeatSelectionComponent } from "./ticket-booking-form/seat-selection/seat-selection.component";
import { TicketBookingFormComponent } from "./ticket-booking-form/ticket-booking-form.component";
import { SingleBookedTicketComponent } from "./ticket/single-booked-ticket/single-booked-ticket.component";
import { TicketComponent } from "./ticket/ticket.component";


@NgModule({
    declarations:[
        MovieRecommendationComponent,
        MovieReviewsComponent,
        MovieTheatreDetailsComponent,
        TicketComponent,
        SingleBookedTicketComponent,
        TicketBookingFormComponent,
        SeatSelectionComponent, 
        MovieTicketBookingComponent
    ],
    imports :[
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        MovieTicketBookingRoutingModule
    ],
    exports :[
        MovieRecommendationComponent,
        MovieReviewsComponent,
        MovieTheatreDetailsComponent,
        TicketComponent,
        SingleBookedTicketComponent,
        TicketBookingFormComponent,
        SeatSelectionComponent, 
        MovieTicketBookingComponent
    ]

})
export class MovieTicketBookingModule{}