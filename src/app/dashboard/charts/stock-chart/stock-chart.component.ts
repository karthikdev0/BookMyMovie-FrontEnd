import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";


let data = [
  { Date: new Date("2022-05-01").getTime(), Open: 70.858002, High: 72.080002, Low: 64.809998, Close: 65.019997, Volume: 18642700 },
  { Date: new Date("2022-05-02").getTime(), Open: 63.865002, High: 67.160004, Low: 60.509998, Close: 64.510002, Volume: 19323400 },
  { Date: new Date("2022-05-03").getTime(), Open: 60.110001, High: 64.300003, Low: 55.099998, Close: 63.900002, Volume: 24134800 },
  { Date: new Date("2022-05-04").getTime(), Open: 61.105, High: 61.93, Low: 58, Close: 59.610001, Volume: 16557200 },
  { Date: new Date("2022-05-05").getTime(), Open: 62.349998, High: 68.07, Low: 59.009998, Close: 60.27, Volume: 23694100 },
  { Date: new Date("2022-05-06").getTime(), Open: 61.330002, High: 61.700001, Low: 53.331001, Close: 53.939999, Volume: 23385500 },
  { Date: new Date("2022-05-07").getTime(), Open: 53.599998, High: 57.299999, Low: 50, Close: 57.119999, Volume: 23942400 },
  { Date: new Date("2022-05-08").getTime(), Open: 70.858002, High: 72.080002, Low: 64.809998, Close: 43.019997, Volume: 18642700 },
  { Date: new Date("2022-05-09").getTime(), Open: 63.865002, High: 67.160004, Low: 60.509998, Close: 40.510002, Volume: 19323400 },
  { Date: new Date("2022-05-10").getTime(), Open: 60.110001, High: 64.300003, Low: 55.099998, Close: 98.900002, Volume: 24134800 },
  { Date: new Date("2022-05-11").getTime(), Open: 61.105, High: 61.93, Low: 58, Close: 12.610001, Volume: 16557200 },
  { Date: new Date("2022-05-12").getTime(), Open: 62.349998, High: 68.07, Low: 59.009998, Close: 34.27, Volume: 23694100 },
  { Date: new Date("2022-05-13").getTime(), Open: 61.330002, High: 61.700001, Low: 53.331001, Close: 53.939999, Volume: 23385500 },
  { Date: new Date("2022-05-14").getTime(), Open: 53.599998, High: 57.299999, Low: 50, Close: 67.119999, Volume: 23942400 },
  { Date: new Date("2022-05-15").getTime(), Open: 70.858002, High: 72.080002, Low: 64.809998, Close: 56.019997, Volume: 18642700 },
  { Date: new Date("2022-05-16").getTime(), Open: 63.865002, High: 67.160004, Low: 60.509998, Close: 45.510002, Volume: 19323400 },
  { Date: new Date("2022-05-17").getTime(), Open: 60.110001, High: 64.300003, Low: 55.099998, Close: 35.900002, Volume: 24134800 },
  { Date: new Date("2022-05-18").getTime(), Open: 61.105, High: 61.93, Low: 58, Close: 45.610001, Volume: 16557200 },
  { Date: new Date("2022-05-19").getTime(), Open: 62.349998, High: 68.07, Low: 59.009998, Close: 70.27, Volume: 23694100 },
  { Date: new Date("2022-05-20").getTime(), Open: 61.330002, High: 61.700001, Low: 53.331001, Close: 53.939999, Volume: 23385500 },
  { Date: new Date("2022-05-21").getTime(), Open: 53.599998, High: 57.299999, Low: 50, Close: 57.119999, Volume: 23942400 },
  { Date: new Date("2022-05-22").getTime(), Open: 70.858002, High: 72.080002, Low: 64.809998, Close: 79.019997, Volume: 18642700 },
  { Date: new Date("2022-05-23").getTime(), Open: 63.865002, High: 67.160004, Low: 60.509998, Close: 45.510002, Volume: 19323400 },
  { Date: new Date("2022-05-24").getTime(), Open: 60.110001, High: 64.300003, Low: 55.099998, Close: 23.900002, Volume: 24134800 },
  { Date: new Date("2022-05-25").getTime(), Open: 61.105, High: 61.93, Low: 58, Close: 15.610001, Volume: 16557200 },
  { Date: new Date("2022-05-26").getTime(), Open: 62.349998, High: 68.07, Low: 59.009998, Close: 78.27, Volume: 23694100 },
  { Date: new Date("2022-05-27").getTime(), Open: 61.330002, High: 61.700001, Low: 53.331001, Close: 56.939999, Volume: 23385500 },
  { Date: new Date("2022-05-28").getTime(), Open: 53.599998, High: 57.299999, Low: 50, Close: 43.119999, Volume: 23942400 },
  { Date: new Date("2022-05-29").getTime(), Open: 70.858002, High: 72.080002, Low: 64.809998, Close: 98.019997, Volume: 18642700 },
  { Date: new Date("2022-05-30").getTime(), Open: 63.865002, High: 67.160004, Low: 60.509998, Close: 67.510002, Volume: 19323400 },
  { Date: new Date("2022-05-31").getTime(), Open: 60.110001, High: 64.300003, Low: 55.099998, Close: 14.900002, Volume: 24134800 }
];

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let root = am5.Root.new("chartdivstock");
 //   root.dateFormatter.set("dateFormat","yyyy-MM-dd");
/*     root.setThemes([
      am5themes_Animated.new(root)
    ]); */
    let stockChart = root.container.children.push(
    am5stock.StockChart.new(root,  {
      stockPositiveColor: am5.color(0x999999),
      stockNegativeColor: am5.color(0x000000),
      volumePositiveColor: am5.color(0x999999),
      volumeNegativeColor: am5.color(0x000000)
      
    })

    );

    let toolbar = am5stock.StockToolbar.new(root, {
      container: document.getElementById("chartcontrols") as HTMLElement,
      stockChart: stockChart,
      controls: [
        am5stock.IndicatorControl.new(root, {
          stockChart: stockChart
        }),
        am5stock.ResetControl.new(root, {
          stockChart: stockChart
        }),
        am5stock.SettingsControl.new(root, {
          stockChart: stockChart
        }),
        am5stock.DrawingControl.new(root, {
          stockChart: stockChart
        })
      ]
    });

    let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
      wheelY: "zoomX",
      panX: true,
      panY: true
    }));
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    let dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1,
      },
/*       gridIntervals: [
        { timeUnit: "day", count: 1 },
        { timeUnit: "week", count: 1 },
        { timeUnit :"month", count:1}
      ], */
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

  //  dateAxis.get("dateFormats")["day"] = "MM/dd";
  ///  dateAxis.get("periodChangeDateFormats")["day"] = "MMM";

    

    

    

    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

   
    let valueSeries = mainPanel.series.push(am5xy.LineSeries.new(root, {
      name: "PEOPLE's",
      valueXField: "Date",
      valueYField: "Volume",
      xAxis: dateAxis,
      yAxis: valueAxis,
      legendValueText: "{valueY}",
      tooltip: am5.Tooltip.new(root, {
        labelText: "[bold] Number of {name} : {valueY}[/]\n On {valueX.formatDate().} "
      })
    }
    ));

    
   
    
    valueSeries.data.setAll(data);

   
    
    // Set main value series
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
    stockChart.set("stockSeries", valueSeries);
    
    // Add a stock legend
    // https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
   // let valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
   //   stockChart: stockChart
   // }));
   // valueLegend.data.setAll([valueSeries]);
    
    /**
     * Secondary (volume) panel
     */
    
    // Create a main stock panel (chart)
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding_panels
   // let volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
   //   wheelY: "zoomX",
   //   panX: true,
   //   panY: true,
   //   height: am5.percent(30)
  //  }));
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  //  let volumeValueAxis = volumePanel.yAxes.push(am5xy.ValueAxis.new(root, {
  //    numberFormat: "#.#a",
 //     renderer: am5xy.AxisRendererY.new(root, {})
 //   }));
    
 //   let  volumeDateAxis = volumePanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
 //     baseInterval: {
 //       timeUnit: "day",
 //       count: 1
 //     },
 //     renderer: am5xy.AxisRendererX.new(root, {})
 //   }));
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
 //   let volumeSeries = volumePanel.series.push(am5xy.ColumnSeries.new(root, {
 //     name: "PEOPLE's",
 //     valueXField: "Date",
 //     valueYField: "Volume",
 //     xAxis: volumeDateAxis,
 //     yAxis: volumeValueAxis,
 //     legendValueText: "{valueY}",
//      tooltip: am5.Tooltip.new(root, {
 //       labelText: "[bold] Number of {name} : {valueY}[/]\n On {valueX.formatDate()} "
 //     })
 //   }));
    
  //  volumeSeries.data.setAll(data);
    
    // Set main value series
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
   // stockChart.set("volumeSeries", volumeSeries);
    
    
    // Add a stock legend
    // https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
    //let volumeLegend = volumePanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
    //  stockChart: stockChart
    //}));
   // volumeLegend.data.setAll([volumeSeries]);
    
    
    // Add cursor(s)
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    mainPanel.set("cursor", am5xy.XYCursor.new(root, {
      yAxis: valueAxis,
      xAxis: dateAxis,
      snapToSeries: [valueSeries],
      snapToSeriesBy: "y!"
    }));
    
 //   volumePanel.set("cursor", am5xy.XYCursor.new(root, {
 //     yAxis: volumeValueAxis,
 //     xAxis: volumeDateAxis,
 //     snapToSeries: [volumeSeries],
 ///     snapToSeriesBy: "y!"
 //   }));
    
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    let scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 50
    }));
    stockChart.toolsContainer.children.push(scrollbar);
    
    let sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1

      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));
    
    let sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    let sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
      valueYField: "Close",
      valueXField: "Date",
      xAxis: sbDateAxis,
      yAxis: sbValueAxis
    }));
    
    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3
    });
    
    sbSeries.data.setAll(data);

 












  }

  


  


}
