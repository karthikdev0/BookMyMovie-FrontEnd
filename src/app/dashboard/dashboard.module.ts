
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "../material/material.module";
import { AllTicketDetailsComponent } from "./all-ticket-details/all-ticket-details.component";
import { ChartsComponent } from "./charts/charts.component";
import { LineChartComponent } from "./charts/line-chart/line-chart.component";
import { PieChartComponent } from "./charts/pie-chart/pie-chart.component";
import { StockChartComponent } from "./charts/stock-chart/stock-chart.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { EditMovieComponent } from "./edit-movie/edit-movie.component";
import { InsertMovieRecordComponent } from "./insert-movie-record/insert-movie-record.component";
import { MovieComponent } from "./insert-movie-record/movie/movie.component";
import { UploadComponent } from "./insert-movie-record/movie/upload/upload.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { MyReviewsComponent } from "./my-reviews/my-reviews.component";
import { ReviewChartComponent } from './charts/review-chart/review-chart.component';


export function tokenGetter() {
    return localStorage.getItem("token");
  }

@NgModule({
    declarations:[
        DashboardComponent,
        AllTicketDetailsComponent,
        ChartsComponent,
        LineChartComponent,
        PieChartComponent,
        StockChartComponent,
        EditMovieComponent,
        InsertMovieRecordComponent,
        MovieComponent,
        UploadComponent,
        MyAccountComponent,
        MyReviewsComponent,
        ReviewChartComponent,
    ],
    imports:[ 
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        DashboardRoutingModule,
    ],

})
export class DashboardModule{}