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

  private chart: am4charts.XYChart | undefined;

  toggleBtn:boolean = false;

  lineChartTabBtn:boolean = false;

  constructor(private zone: NgZone,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.toggleBtn = false;
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

  
 Monthdata  = [
  {"movie 2":900000,"movie 1":200000,"movie 3":234000,"movie 4": 120000,"month": "Jan"},
  {"movie 2":600000,"movie 1":400000,"movie 3":173000,"movie 4": 560000,"month": "Feb"},
  {"movie 2":300000,"movie 1":100000,"movie 3":900000,"movie 4": 230000,"month": "Mar"},
  {"movie 2":500000,"movie 1":900000,"movie 3":1000000,"movie 4": 100000,"month": "Apr"},
]

weekData = [
  {"movie 2":90000,"movie 1":20000,"movie 3":23400,"movie 4": 12000,"month": "Mon"},
  {"movie 2":60000,"movie 1":40000,"movie 3":17300,"movie 4": 56000,"month": "Tues"},
  {"movie 2":30000,"movie 1":10000,"movie 3":90000,"movie 4": 23000,"month": "Wed"},
  {"movie 2":50000,"movie 1":90000,"movie 3":100000,"movie 4": 10000,"month": "Thru"},
  {"movie 2":20000,"movie 1":50000,"movie 3":47300,"movie 4": 26000,"month": "Fri"},
  {"movie 2":30000,"movie 1":20000,"movie 3":30000,"movie 4": 23000,"month": "Sat"},
  {"movie 2":10000,"movie 1":30000,"movie 3":40000,"movie 4": 90000,"month": "Sun"}
]


  switchData(){
    this.toggleBtn = !this.toggleBtn;
   // console.log(this.toggleBtn);
    this.chart  = am4core.create("chartdiv",am4charts.XYChart);
    let title  =  this.chart.titles.create();
    title.text = "Total collection by movie";

    let xTitle;
    if(this.toggleBtn === false){
      this.chart.data = this.Monthdata;
      xTitle = 'Month';
    }
    else{
      this.chart.data = this.weekData;
      xTitle = "Week"
    }

    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text = xTitle;
      categoryAxis.dataFields.category = "month";

      let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = "Total collection";
      valueAxisY.renderer.minWidth = 20;

      let seriesNames  = ["movie 1","movie 2","movie 3","movie 4"];

      for(let i=0;i<4;i++){
        let series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX  = "month";
        series.dataFields.valueY = seriesNames[i];
        series.name = seriesNames[i];
      
        let bullet  =  series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        
        bullet.tooltipText = "Month : {categoryX} \n collection:{valueY} \n title: {name} ";
      }

      this.chart.legend  = new am4charts.Legend();

  }



  toggelActiveTab(){
    this.lineChartTabBtn = ! this.lineChartTabBtn;
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