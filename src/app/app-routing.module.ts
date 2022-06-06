import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTicketDetailsComponent } from './dashboard/all-ticket-details/all-ticket-details.component';
import { ChartsComponent } from './dashboard/charts/charts.component';
import { LineChartComponent } from './dashboard/charts/line-chart/line-chart.component';
import { PieChartComponent } from './dashboard/charts/pie-chart/pie-chart.component';
import { StockChartComponent } from './dashboard/charts/stock-chart/stock-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditMovieComponent } from './dashboard/edit-movie/edit-movie.component';
import { InsertMovieRecordComponent } from './dashboard/insert-movie-record/insert-movie-record.component';
import { MyAccountComponent } from './dashboard/my-account/my-account.component';
import { MyReviewsComponent } from './dashboard/my-reviews/my-reviews.component';
import { WriteReviewComponent } from './dashboard/write-review/write-review.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieTicketBookingComponent } from './movie-ticket-booking/movie-ticket-booking.component';
import { SingleBookedTicketComponent } from './movie-ticket-booking/ticket/single-booked-ticket/single-booked-ticket.component';
import { TicketComponent } from './movie-ticket-booking/ticket/ticket.component';
//import { MovieComponent } from './movie/movie.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'movie-list',component:MovieListComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  {path:'ticket',component:TicketComponent},
  {path:'single-ticket',component:SingleBookedTicketComponent},
  {path:'movie-ticket-booking/:id',component:MovieTicketBookingComponent,
  canActivate:[AuthGuardGuard]
 

},
  {path:'home',component:HomeComponent},
 // {path:'movie',component:MovieComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuardGuard]},
 // {path:'dashboard/:username',component:DashboardComponent,canActivate:[AuthGuardGuard]},

  {path:'dashboard/:admin',component:DashboardComponent,canActivate:[AuthGuardGuard],

  children : [ 
    //{ path:'movie-insert',component:MovieComponent} ,
  {path:'movie-edit',component:EditMovieComponent},
    { path:'my-account',component:MyAccountComponent},
    {path:'my-tickets-details',component:AllTicketDetailsComponent},
    {path:'insert-movie-record',component:InsertMovieRecordComponent},
    {path:'my-reviews',component:MyReviewsComponent},
    {path:'write-review',component:WriteReviewComponent},
    {path:'charts',component:ChartsComponent,children :[
      {
        path:'pie-chart',component:PieChartComponent
      },
      {
        path:'line-chart',component:LineChartComponent
      },
      {
        path:'stock-chart',component:StockChartComponent
      }
    ]}
]

},
//{path:'dashboard/:admin/movie-insert',component:DashboardComponent,canActivate:[AuthGuardGuard]},
  {path:'**',redirectTo:'/home',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
