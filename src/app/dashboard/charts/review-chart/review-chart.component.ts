import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-review-chart',
  templateUrl: './review-chart.component.html',
  styleUrls: ['./review-chart.component.css']
})
export class ReviewChartComponent implements OnInit ,AfterViewInit {


   tableData :any[]=[];
   tableDataCopy : any[]=[];

   resetValue: string = '1';

   chartData : any[]=[];

  public chart!: am4charts.PieChart;

  constructor(private analyticService:AnalyticsService) { }


  resetChart(){
    console.log(this.chartData);
    this.tableData = this.tableDataCopy;
     this.resetValue = "1";
    console.log(this.tableData);
  }

  /* MatButtonToggleChange */

  ratingFilter(value:any){
        console.log(typeof value);
        this.resetValue = value;
        this.tableData = this.tableDataCopy.filter( x => value <  x.ratings)
  }


  ngAfterViewInit(): void {

    //this.tableData = this.data;
    
    var chart = am4core.create("chartdivpie", am4charts.PieChart);
      console.log(this.chartData);
      chart.data = this.chartData;
      chart.radius = 120;
      let title  = chart.titles.create();
      title.text = "Movie ratings";
      title.fontSize = 20;





// Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "rating";
//pieSeries.labels.template.text = "{category}: {value.percent.formatNumber('#.#')}%";
      pieSeries.slices.template.tooltipText = "rating {category} :{value.percent.formatNumber('#.#')}%";
      pieSeries.labels.template.text = "";
      pieSeries.colors.list = [
        am4core.color('#003f5c'),
        am4core.color('#58508d'),
        am4core.color('#bc5090'),
        am4core.color('#ff6361'),
        am4core.color('#ffa600')
      ];
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


    chart.legend = new am4charts.Legend();


    this.chart = chart;

   

    pieSeries.slices.template.propertyFields.isActive="pulled";

    pieSeries.slices.template.events.on("hit", (ev) => {
  

        let context:any = ev.target.dataItem?.dataContext;
      //  console.log(context);
      //  console.log(this.tableDataCopy);
        let data_sliced = this.tableDataCopy.filter( x => x.ratings === context.rating);
       // console.log(data_sliced);
        this.tableData = data_sliced;

       let toggleBtnValue  =  Math.floor(context.rating);
        console.log(typeof toggleBtnValue.toString());

      // this.ratingFilter(toggleBtnValue.toString());
        this.resetValue = toggleBtnValue.toString();
      

     });

}

  ngOnInit(): void {

    this.analyticService.getAll().subscribe( res => {
      console.log(res);

    this.convert2DTo1D(res);
    this.convertToChartData(res);

    this.resetChart();

          });   

  }

  convert2DTo1D(res:any){
    for (let row of res){
      for (let e of row) {
        this.tableData.push(e);
      }
    }

    this.tableDataCopy = this.tableData;

    console.log(this.tableData);
  }

  convertToChartData(res:any){
    for(let i=0;i < res.length;i++){
      let rate;
      let length;
      for(let j=0;j< res[i].length;j++){
            if(j === 0){
              length =res[i].length;
              rate = res[i][j].ratings;
             // console.log(res[i].length);
              //console.log(res[i][j].ratings);
              break;
            }
            
      }
      //console.log(rate,length);
      
      this.chartData.push({rating : rate,count : length});
    }
      console.log(this.chartData);
    this.chart.data = this.chartData;
  }

}
