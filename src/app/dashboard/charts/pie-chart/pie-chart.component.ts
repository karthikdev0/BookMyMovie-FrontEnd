import { AfterContentInit, AfterViewChecked, AfterViewInit, Component,DoCheck,NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { MatSelectChange } from '@angular/material/select';

am4core.useTheme(am4themes_animated);

let data = [
  {
    "theatre":"Theatre B",
    "title":"movie 1",
    "seats":70,
    "silverSeats":20,
    "goldSeats":30,
    "platinumSeats":20,
    "pulled":true
  },
  {
    "theatre":"Theatre B",
    "title":"movie 2",
    "seats":100,
    "silverSeats":40,
    "goldSeats":20,
    "platinumSeats":40
  },
  {
    "theatre":"Theatre B",
    "title":"movie 4",
    "seats":50,
    "silverSeats":10,
    "goldSeats":30,
    "platinumSeats":10
  },
  {
    "theatre":"Theatre A",
    "title":"movie 1",
    "seats":100,
    "silverSeats":50,
    "goldSeats":30,
    "platinumSeats":20,
    "pulled":true
  },
  {
    "theatre":"Theatre A",
    "title":"movie 2",
    "seats":150,
    "silverSeats":70,
    "goldSeats":30,
    "platinumSeats":50
  },
  {
    "theatre":"Theatre A",
    "title":"movie 3",
    "seats":200,
    "silverSeats":100,
    "goldSeats":50,
    "platinumSeats":50
  },
{
  "theatre":"Theatre A",
  "title":"movie 4",
  "seats":70,
  "silverSeats":30,
  "goldSeats":30,
  "platinumSeats":10
}

 ];


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit , AfterViewInit{

  public chart: am4charts.PieChart | undefined;

  public chart2:am4charts.PieChart | undefined;

  selectedTitle:string ='';
  selectedTheatre:string ='Theatre A';

  constructor(private zone: NgZone) {}
 
  ngOnInit(): void {

  
  
  }

  

  

  getChartForSelectedTheatre(tvalue:any){
    console.log(tvalue);
    console.log(this.chart?.data);
    console.log(this.chart2);
    this.selectedTitle = '';
    if(this.chart?.data){
      this.chart.data = data.filter( x => x.theatre === tvalue); 
    }
    if (this.chart2) {
      this.chart2.dispose();
      }
  }

  

  ngAfterViewInit() {
var chart = am4core.create("chartdivpie", am4charts.PieChart);

chart.data = data.filter( x => x.theatre === this.selectedTheatre);
chart.radius = 120;
let title  = chart.titles.create();
title.text = this.selectedTheatre;
title.fontSize = 20;





// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "seats";
pieSeries.dataFields.category = "title";
//pieSeries.labels.template.text = "{category}: {value.percent.formatNumber('#.#')}%";
pieSeries.slices.template.tooltipText = "{category} :{value.percent.formatNumber('#.#')}%";
pieSeries.labels.template.text = "";
pieSeries.colors.list = [
  am4core.color('#388E3C'),
  am4core.color('#FBC02D'),
  am4core.color('#0288D1'),
]
pieSeries.slices.template.stroke = am4core.color("#4a2abb");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
let as = pieSeries.slices.template.states.getKey("active");
if(as !== undefined){
  as.properties.shiftRadius = 0;
}
let ds = pieSeries.slices.template.states.getKey("default");
if(ds){
  ds.properties.scale = 1;
}

console.log(this.selectedTheatre);

chart.legend = new am4charts.Legend();

this.chart = chart;


pieSeries.slices.template.propertyFields.isActive="pulled";
let slicesValues =  pieSeries.slices.values;



pieSeries.slices.template.events.on("hit", function(ev){
  

  //this.createChart2(ev.target.dataItem?.dataContext);
 let chart2 = am4core.create("chartdivpie2", am4charts.PieChart);
  console.log(ev.target.dataItem?.dataContext);
  let context:any = ev.target.dataItem?.dataContext;

  let c2FilteredData = data.filter( x => {
            this.selectedTitle = context.title;
        return x.theatre === context.theatre && x.title === context.title
      })
      .map( (x:any) => {
        return [
          {"title":"silver seats","seats":x.silverSeats,"theatre":x.theatre},
          {"title":"gold seats","seats":x.goldSeats,"theatre":x.theatre},
          {"title":"platium seats","seats":x.platinumSeats,"theatre":x.theatre},
        ]
      }); 
      console.log(c2FilteredData);
      chart2.data = c2FilteredData[0];
      let title  = chart2.titles.create();
      if(this.selectedTitle !==  undefined){
        title.text = this.selectedTitle;
        //title.text ='';
        title.fontSize = 20;
      }
      if(this.selectedTitle === ''){
        title.text = '';
      }
     


 chart2.radius = 120;

var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
pieSeries2.dataFields.value = "seats";
pieSeries2.dataFields.category = "title";
//pieSeries.labels.template.text = "{category}: {value.percent.formatNumber('#.#')}%";
pieSeries2.slices.template.tooltipText = "{category} :{value.percent.formatNumber('#.#')}%";
pieSeries2.labels.template.text = "";
pieSeries2.colors.list = [
  am4core.color('#C0C0C0'),
  am4core.color('#FFD700'),
  am4core.color('#E5E4E2'),
]
pieSeries2.slices.template.stroke = am4core.color("#4a2abb");
pieSeries2.slices.template.strokeWidth = 2;
pieSeries2.slices.template.strokeOpacity = 1;


let as = pieSeries2.slices.template.states.getKey("active");
if(as !== undefined){
  as.properties.shiftRadius = 0;
}
chart2.legend = new am4charts.Legend();
this.chart2 = chart2;
},this);


  
}



  ngOnDestroy() {
    this.zone.runOutsideAngular( () =>{
      if (this.chart) {
       this.chart.dispose();
       }
       if(this.chart2){
         this.chart2.dispose();
       }
    })
   
  }

}


