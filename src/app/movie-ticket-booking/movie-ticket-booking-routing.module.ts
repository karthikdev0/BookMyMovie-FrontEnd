import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "../guards/auth-guard.guard";
import { MovieTicketBookingComponent } from "./movie-ticket-booking.component";


const appRoutes:Routes=[
    {path:':id',component:MovieTicketBookingComponent,
    canActivate:[AuthGuardGuard],
  }
]

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports:[RouterModule]
})
export class MovieTicketBookingRoutingModule{}