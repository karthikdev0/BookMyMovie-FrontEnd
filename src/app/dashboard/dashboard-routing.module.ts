import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "../guards/auth-guard.guard";
import { AllTicketDetailsComponent } from "./all-ticket-details/all-ticket-details.component";
import { ChartsComponent } from "./charts/charts.component";
import { LineChartComponent } from "./charts/line-chart/line-chart.component";
import { PieChartComponent } from "./charts/pie-chart/pie-chart.component";
import { StockChartComponent } from "./charts/stock-chart/stock-chart.component";
import { DashboardComponent } from "./dashboard.component";
import { EditMovieComponent } from "./edit-movie/edit-movie.component";
import { InsertMovieRecordComponent } from "./insert-movie-record/insert-movie-record.component";
import { MovieComponent } from "./insert-movie-record/movie/movie.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { MyReviewsComponent } from "./my-reviews/my-reviews.component";
import { WriteReviewComponent } from "./write-review/write-review.component";

const routes:Routes = [
    {path:'',
    component:DashboardComponent,
    canActivate:[AuthGuardGuard],
    children :[
        { path:'my-account',component:MyAccountComponent},
        { path:'movie-insert',component:MovieComponent} ,
    {path:'movie-edit',component:EditMovieComponent},
    { path:'my-account',component:MyAccountComponent},
    {path:'my-tickets-details',component:AllTicketDetailsComponent},
    {path:'insert-movie-record',component:InsertMovieRecordComponent},
    {path:'my-reviews',component:MyReviewsComponent},
    {path:'write-review',component:WriteReviewComponent},
    {path:'charts/line-chart',component:LineChartComponent},
    {path:'charts/pie-chart',component:PieChartComponent},
    {path:'charts/stock-chart',component:StockChartComponent},
    {path:'charts',component:ChartsComponent,
    
    children :[
      { path:'pie-chart',component:PieChartComponent },
      { path:'line-chart',component:LineChartComponent },
      { path:'stock-chart',component:StockChartComponent }
    ]}
    ]
  },
]

@NgModule({
    imports :[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class DashboardRoutingModule{}