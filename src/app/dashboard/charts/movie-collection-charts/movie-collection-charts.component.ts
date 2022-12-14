import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-collection-charts',
  templateUrl: './movie-collection-charts.component.html',
  styleUrls: ['./movie-collection-charts.component.css']
})
export class MovieCollectionChartsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.isChecked = true;
   this.router.navigate(['../dashboard/'+'a' +'/charts/movie-collection-chart/bar']);
   /* this.router.navigate(['../dashboard/'+'a' +'/charts/line']); */
  }

  isChecked:boolean = true;
  checkedValue:string = 'Bar';

  slideToggle(value: boolean){
      if(value ===  false){
        this.checkedValue = 'Line';
        this.router.navigate(['../dashboard/'+'a' +'/charts/movie-collection-chart/line']);
       //this.router.navigate(['../dashboard/'+'a' +'/charts/line']);
      }
      else{
        this.checkedValue = 'Bar';
        this.router.navigate(['../dashboard/'+'a' +'/charts/movie-collection-chart/bar']);
        //this.router.navigate(['../dashboard/'+'a' +'/charts/bar']);
      }
  }

}
