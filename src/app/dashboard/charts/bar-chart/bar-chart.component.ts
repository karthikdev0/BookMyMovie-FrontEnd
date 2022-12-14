import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {  Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import  am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {

  private chart!: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId : Object, private zone: NgZone) {}

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {

    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_kelly);
      am4core.options.autoDispose = true;

      this.chart = am4core.create("chartdivb", am4charts.XYChart);
  
      let title  =  this.chart.titles.create();
      title.text = "Total collection by movie";

    this.chart.data = [{
      "movie": "movie 1",
      "tickets": 501.9,
      "units": 250000
    }, {
      "movie": "movie 2",
      "tickets": 301.9,
      "units": 222000
    }, {
      "movie": "movie 3",
      "tickets": 201.1,
      "units": 170000
    }, {
      "movie": "movie 4",
      "tickets": 165.8,
      "units": 122000
    }, {
      "movie": "movie 5",
      "tickets": 139.9,
      "units": 99000
    }, {
      "movie": "movie 6",
      "tickets": 128.3,
      "units": 85000
    }, {
      "movie": "movie 7",
      "tickets": 99,
      "units": 93000
    }, {
      "movie": "movie 8",
      "tickets": 60,
      "units": 50000
    }];
    
    // Create axes
    var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "movie";
    categoryAxis.title.text = "Movies Title";
    
    // First value axis
    var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Tickets sold (M)";
    
    // Second value axis
    var valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = "Total collection";
    valueAxis2.renderer.opposite = true;
    
    // First series
    var series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "tickets";
    series.dataFields.categoryX = "movie";
    series.name = "Tickets";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    
    // Second series
    var series2 = this.chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "units";
    series2.dataFields.categoryX = "movie";
    series2.name = "Total collection";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.strokeWidth = 3;
    series2.yAxis = valueAxis2;
    
    // Add legend
    this.chart.legend = new am4charts.Legend();
    
    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();


    })

    

  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
  this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    }); 

/*     this.zone.runOutsideAngular( () =>{
      if (this.chart) {
       this.chart.dispose();
       }
    }); */
  }


}
