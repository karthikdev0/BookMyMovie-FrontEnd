import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrls: ['./charts-dashboard.component.css']
})
export class ChartsDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  
  toLineChartPage(){
    this.router.navigate(['../dashboard/'+'a' +'/charts/line-chart']);
  }
  toPieChartPage(){
    this.router.navigate(['../dashboard/'+'a' +'/charts/pie-chart']);
  }
  toStockChartPage(){
    this.router.navigate(['../dashboard/'+'a' +'/charts/stock-chart']);
  }

  toReviewChartPage(){
    this.router.navigate(['../dashboard/'+'a' +'/charts/review-chart']);
  }
  toMovieCollectionChartPage(){
    this.router.navigate(['../dashboard/'+'a' +'/charts/movie-collection-chart']);
  }

}
