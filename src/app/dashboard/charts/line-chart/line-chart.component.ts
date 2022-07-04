import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { FormControl } from '@angular/forms';

am4core.useTheme(am4themes_animated);

let Monthdata  = [
  {"movie 2":900000,"movie 1":200000,"movie 3":234000,"movie 4": 120000,"movie 5":200000,"movie 6" :234000,"movie 7": 135711,"movie 8":173000,"month": "Jan"},
  {"movie 2":600000,"movie 1":400000,"movie 3":173000,"movie 4": 560000,"movie 5":234000,"movie 6" :222200,"movie 7": 333300,"movie 8":234000,"month": "Feb"},
  {"movie 2":300000,"movie 1":100000,"movie 3":900000,"movie 4": 230000,"movie 5":173000,"movie 6" :200000,"movie 7":234000,"movie 8":200000,"month": "Mar"},
  {"movie 2":500000,"movie 1":900000,"movie 3":1000000,"movie 4": 100000,"movie 5":111110,"movie 6" :124670,"movie 7": 246890,"movie 8":173000,"month": "Apr"},
  {"movie 2":900000,"movie 1":200000,"movie 3":234000,"movie 4": 120000,"movie 5":112311,"movie 6" :200000,"movie 7": 173000,"movie 8":12367,"month": "May"},
  {"movie 2":600000,"movie 1":400000,"movie 3":173000,"movie 4": 560000,"movie 5":200000,"movie 6" :234000,"movie 7": 340912,"movie 8":234000,"month": "Jun"},
  {"movie 2":300000,"movie 1":100000,"movie 3":900000,"movie 4": 230000,"movie 5":234000,"movie 6" :126792,"movie 7": 200000,"movie 8":173000,"month": "Jly"},
  {"movie 2":500000,"movie 1":900000,"movie 3":1000000,"movie 4": 100000,"movie 5":173000,"movie 6" :173000,"movie 7": 156789,"movie 8":200000,"month": "Aug"},
  {"movie 2":900000,"movie 1":200000,"movie 3":234000,"movie 4": 120000,"movie 5":457890,"movie 6" :200000,"movie 7": 173000,"movie 8":234000,"month": "Spt"},
  {"movie 2":600000,"movie 1":400000,"movie 3":173000,"movie 4": 560000,"movie 5":200000,"movie 6" :679010,"movie 7": 200000,"movie 8":173000,"month": "Oct"},
  {"movie 2":300000,"movie 1":100000,"movie 3":900000,"movie 4": 230000,"movie 5":111110,"movie 6" :123456,"movie 7":567232,"movie 8":345678,"month": "Nov"},
  {"movie 2":500000,"movie 1":900000,"movie 3":1000000,"movie 4": 100000,"movie 5":234000,"movie 6" :126790,"movie 7": 345678,"movie 8":343780,"month": "Dec"},
]

let weekData = [
  {"movie 2":90000,"movie 1":20000,"movie 3":23400,"movie 4": 12000,"movie 5":10000,"movie 6":12879,"movie 7":13234,"movie 8":24365,"week": "Monday"},
  {"movie 2":60000,"movie 1":40000,"movie 3":17300,"movie 4": 56000,"movie 5":11324,"movie 6":1689,"movie 7":1268,"movie 8":44658,"week": "Tuesday"},
  {"movie 2":30000,"movie 1":10000,"movie 3":90000,"movie 4": 23000,"movie 5":34561,"movie 6":65870,"movie 7":45780,"movie 8":6784,"week": "Wednesday"},
  {"movie 2":50000,"movie 1":90000,"movie 3":100000,"movie 4": 10000,"movie 5":56234,"movie 6":12346,"movie 7":76990,"movie 8":8975,"week": "Thrusday"},
  {"movie 2":20000,"movie 1":50000,"movie 3":47300,"movie 4": 26000,"movie 5":12892,"movie 6":65808,"movie 7":67794,"movie 8":23451,"week": "Friday"},
  {"movie 2":30000,"movie 1":20000,"movie 3":30000,"movie 4": 23000,"movie 5":15690,"movie 6":24799,"movie 7":23456,"movie 8":12454,"week": "Saturday"},
  {"movie 2":10000,"movie 1":30000,"movie 3":40000,"movie 4": 90000,"movie 5":14643,"movie 6":14795,"movie 7":32547,"movie 8":56891,"week": "Sunday"}
]


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  private chart: am4charts.XYChart | undefined;

  toggleBtn:boolean = false;

  dataFormat:string='monthly';
  dataControl = new FormControl();
  monthsControl = new FormControl();
  movieControl = new FormControl();
  weeksControl = new FormControl();

  weeks =[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  months = [
    {
      "abbreviation": "Jan",
      "name": "January"
    },
    {
      "abbreviation": "Feb",
      "name": "February"
    },
    {
      "abbreviation": "Mar",
      "name": "March"
    },
    {
      "abbreviation": "Apr",
      "name": "April"
    },
    {
      "abbreviation": "May",
      "name": "May"
    },
    {
      "abbreviation": "Jun",
      "name": "June"
    },
    {
      "abbreviation": "Jul",
      "name": "July"
    },
    {
      "abbreviation": "Aug",
      "name": "August"
    },
    {
      "abbreviation": "Sep",
      "name": "September"
    },
    {
      "abbreviation": "Oct",
      "name": "October"
    },
    {
      "abbreviation": "Nov",
      "name": "November"
    },
    {
      "abbreviation": "Dec",
      "name": "December"
    }
  ];

  movies = [
    {title:"movie 1"},
    {title:"movie 2"},
    {title:"movie 3"},
    {title:"movie 4"},
    {title:"movie 5"},
    {title:"movie 6"},
    {title:"movie 7"},
    {title:"movie 8"},
    {title:"movie 9"},
    {title:"movie 10"},

  ]


  weekDataFinal:any[]=[];
  constructor() {}

  ngOnInit(): void {
    this.toggleBtn = false;
    this.chart  = am4core.create("chartdiv",am4charts.XYChart);
    let title  =  this.chart.titles.create();
    title.text = "Total collection by movie";

  
    this.chart.colors.list = [
      am4core.color("red"),
      am4core.color("green"),
      am4core.color("blue"),
      am4core.color("purple"),
      am4core.color("black"),
      am4core.color("brown"),
    ];

    this.chart.data = weekData;

    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text = "week";
      categoryAxis.dataFields.category = "week";

      let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = "Total collection";
      valueAxisY.renderer.minWidth = 20;

      let seriesNames :any[]=[];

        this.movies.forEach( x => {
          seriesNames.push(x.title);
        })

      for(let i=0;i<this.weeks.length;i++){
        let series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX  = "week";
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

  
selectedMovies(data:any){
console.log(data);
}



getChart(){

  
     let WeeklyFilteredData: any[]=[];



     if(this.dataControl.value === 'weekly'){
       let weeks = this.weeksControl.value;
       let moviesNameList :any[]=[];
      for (let key2 in weekData[0]){
          if(key2 !== 'week'){
            moviesNameList.push(key2);
          }       
  } 
  let movies  =   moviesNameList as [];





 
       weeks.forEach((element: string) => {
         weekData.forEach( val => {
          if(element === val.week){
            WeeklyFilteredData.push(val);
           }
         })
       });
    this.chart  = am4core.create("chartdiv",am4charts.XYChart);
    let title  =  this.chart.titles.create();
    title.text = "Total collection by movie";
    this.chart.colors.list = [
      am4core.color("red"),
      am4core.color("green"),
      am4core.color("blue"),
      am4core.color("purple"),
      am4core.color("black"),
      am4core.color("brown"),
    ];
    this.chart.data = WeeklyFilteredData;

    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.title.text = "Week";
    categoryAxis.dataFields.category = "week";

    let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = "Total collection";
    valueAxisY.renderer.minWidth = 20;

    let seriesNames  = movies;

    for(let i=0;i<movies.length;i++){
      let series = this.chart.series.push(new am4charts.LineSeries());
      series.dataFields.categoryX  = "week";
      series.dataFields.valueY = seriesNames[i];
      series.name = seriesNames[i];
    
      let bullet  =  series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#fff");
      
      bullet.tooltipText = "Week : {categoryX} \n collection:{valueY} \n title: {name} ";
    }
    this.chart.legend  = new am4charts.Legend();
}
    if(this.dataControl.value  === 'monthly'){
      let months = this.monthsControl.value;
      let moviesNameList :any[]=[];
      for (let key2 in weekData[0]){
        if(key2 !== 'month')
        moviesNameList.push(key2);
      }

     let movies  =  moviesNameList as [];
      let MonthlyFilteredData: any[]=[];
      months.forEach((element:any) => {
        Monthdata.forEach( val => {
         if(element === val.month){
          MonthlyFilteredData.push(val);
          }
        })
      });
 


      this.chart  = am4core.create("chartdiv",am4charts.XYChart);
      let title  =  this.chart.titles.create();
      title.text = "Total collection by movie";

 
   this.chart.colors.list = [
     am4core.color("red"),
     am4core.color("green"),
     am4core.color("blue"),
     am4core.color("purple"),
     am4core.color("black"),
     am4core.color("brown"),
   ];

   this.chart.data =  MonthlyFilteredData;

   let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
   categoryAxis.title.text = "Month";
   categoryAxis.dataFields.category = "month";

   let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
   valueAxisY.title.text = "Total collection";
   valueAxisY.renderer.minWidth = 20;

   let seriesNames  = movies;

   for(let i=0;i<movies.length;i++){
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
}


}
