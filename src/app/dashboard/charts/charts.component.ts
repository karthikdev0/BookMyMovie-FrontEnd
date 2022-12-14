import { Component,NgZone, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ActivatedRoute, Router } from '@angular/router';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {



  constructor() {}

  ngOnInit(): void {

  }



  



 





  



 /*  ngAfterViewInit() {
    console.log(this.toggleBtn);
    this.zone.runOutsideAngular( () =>{
      let chart = am4core.create("chartdiv",am4charts.XYChart);
      let title  =  chart.titles.create();
      title.text = "Total collection by movie";



    let Monthdata  = [
        {"movie 2":900000,"movie 1":200000,"movie 3":234000,"movie 4": 120000,"month": "Jan","lineColor": chart.colors.next()},
        {"movie 2":600000,"movie 1":400000,"movie 3":173000,"movie 4": 560000,"month": "Feb","lineColor": chart.colors.next()},
        {"movie 2":300000,"movie 1":100000,"movie 3":900000,"movie 4": 230000,"month": "Mar","lineColor": chart.colors.next()},
        {"movie 2":500000,"movie 1":900000,"movie 3":1000000,"movie 4": 100000,"month": "Apr","lineColor": chart.colors.next()},
      ]
      
  let weekData = [
        {"movie 2":900000,"movie 1":200000,"movie 3":234000,"movie 4": 120000,"month": "Mon","lineColor": chart.colors.next()},
        {"movie 2":600000,"movie 1":400000,"movie 3":173000,"movie 4": 560000,"month": "Tues","lineColor": chart.colors.next()},
        {"movie 2":300000,"movie 1":100000,"movie 3":900000,"movie 4": 230000,"month": "Wed","lineColor": chart.colors.next()},
        {"movie 2":500000,"movie 1":900000,"movie 3":1000000,"movie 4": 100000,"month": "Thru","lineColor": chart.colors.next()},
      ]

   
   if(this.toggleBtn === false){
     chart.data = Monthdata;
   }
   else{
     chart.data = weekData;
   }



      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text = 'Month';
      categoryAxis.dataFields.category = "month";

      let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = "Stats";
      valueAxisY.renderer.minWidth = 20;

      let seriesNames  = ["movie 1","movie 2","movie 3","movie 4"];

      for(let i=0;i<4;i++){
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX  = "month";
        series.dataFields.valueY = seriesNames[i];
        series.name = seriesNames[i];
      
        let bullet  =  series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        
        bullet.tooltipText = "Month : {categoryX} \n collection:{valueY} \n title: {name} ";
      }

      chart.legend  = new am4charts.Legend();
     
      this.chart = chart;





    })

  } */

/*   ngOnDestroy() {
    this.zone.runOutsideAngular( () =>{
      if (this.chart) {
       this.chart.dispose();
       }
    })
   
  } */

  

}


      /* this.chart.scrollbarX = new am4core.Scrollbar();
this.chart.scrollbarX.parent = chart.bottomAxesContainer; */