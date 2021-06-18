import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as Highcharts from 'highcharts';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {


  footPrintForm: FormGroup;
  Highcharts: typeof Highcharts = Highcharts;
  options: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Your Carbon consumption: by category'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{series.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Carbon Emission',
      colorByPoint: true,
      data: [
      ]
    }]
  };
  barChartOptions: any = {
    chart: {
      type: 'column',
    //  width: 400
    },
    title: {
      text: 'Your carbon consumption relative to the average Indian(kg CO2)'
    },
    subtitle: {
      text: 'Results in % for each sector'
    },
    xAxis: {
      categories: ['Electricity', 'Flights', 'Transport', 'Food', 'Retail'],
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> <br>Avg Score <b>{point.avg}</b>'
    },
    yAxis: [{
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Your Score'
      }
    }, {
      allowDecimals: false,
      title: {
        text: 'Avg Score'
      },
      min: 1000,
      max: 8000,
      opposite: true
    }],
    series: [{
      name: 'Your Score',
      data: []
    }
    ],
    plotOptions: {
      series: {
        pointWidth: 20
      }
    },
  };
  isShow = false;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  constructor(private fb: FormBuilder) {
    this.footPrintForm = this.fb.group({
      household: ['' ],
      electricityBill: ['' ],
      noOfFlights: ['' ],
      ownCar: ['' ],
      avgDistance: ['' ],
      publicTrans: ['' ],
      publicShare: ['' ],
      shareTrips: ['' ],
      veg: ['' ],
      noOfMeat: ['' ],
      amountSpent: ['' ],
    });
  }

  ngOnInit(): void {
  }

  calculateCarbonFootPrint(): void{
    this.isShow = true;
    const electric = (this.getElectricityBill() / this.getHouseHoldValue()) * 12 / 0.214;
    const flight = this.getNoOfFlights() * 286.88;
    let transportation = 0;
    let food = 0;
    if (this.getNoOfOwnCar().toLowerCase() === 'y' && this.getPublicTrans().toLowerCase() === 'n') {
      transportation = this.getAvgDistance() * 1.61 * 0.435 * 2 * 220;
    } else if (this.getNoOfOwnCar().toLowerCase() === 'y' && this.getPublicTrans().toLowerCase() === 'y') {
      transportation = this.getAvgDistance() * 1.61 * 0.298 * 2 * 220;
    } else if (this.getNoOfOwnCar().toLowerCase() === 'n' && this.getPublicTrans().toLowerCase() === 'y') {
      transportation = this.getAvgDistance() * 1.61 * 0.161 * 2 * 220;
    }
    transportation = transportation + this.getAvgDistance() * 61 * 12;
    if (this.getVeg().toLowerCase() === 'y'){
      food = 1542.21406;
    }
    else if (this.getNoOfMeat().toLowerCase() === 'y'){
      food = 2993.70964;
    }
    else{
      food = 2267.96185;
    }
    const retail = 0.1289 * this.getAmountSpent();
    const footPrint = electric + flight + transportation + food + retail;
    const footprintbytype = [electric, flight, transportation, food, retail];
    const footprint_avg = 14660.85;
    const footprintbytype_avg = [7252.76, 602.45, 4515.27, 2267.96, 22.41];
    const labels_footprint = ['electric (kg Co2/year)', 'flight (kg Co2/year)', 'transportation (kg Co2/year)', 'food (kg Co2/year)', 'retail (kg Co2/year)'];
    const labels_footprintbytype = 'total kg Co2/year';
    const footprint_delta = footPrint - footprint_avg;
    let individual_means;
    if (this.getNoOfOwnCar().toLowerCase() === 'y' && this.getPublicTrans().toLowerCase() === 'n'){
      individual_means = [this.getElectricityBill() / 0.1327 * 12 / 1000,
        this.getNoOfFlights(), this.getAvgDistance() * 220 * 2 / 1000, this.getShareTrips() * 12, footprintbytype[3] / 1000];
    }
    else if (this.getNoOfOwnCar().toLowerCase() === 'y' && this.getPublicTrans().toLowerCase() === 'y'){
      individual_means = [ this.getElectricityBill() / 0.1327 * 12 / 1000,
        this.getNoOfFlights(), this.getAvgDistance() * 220 * 2 / 1000, this.getShareTrips() * 12,  footprintbytype[3] / 1000];
    }
    else if (this.getNoOfOwnCar().toLowerCase() === 'n' && this.getPublicTrans().toLowerCase() === 'y'){
      individual_means = [this.getElectricityBill() / 0.1327 * 12 / 1000,
        this.getNoOfFlights(), this.getAvgDistance() * 220 * 2 / 1000, this.getShareTrips() * 12, footprintbytype[3] / 1000];
    }
    else{
      individual_means = [this.getElectricityBill() / 0.1327 * 12 / 1000,
        this.getNoOfFlights(), 0, this.getShareTrips() * 12, footprintbytype[3] / 1000];
    }
    console.log(individual_means);
    // const dummData = [4.973624717407686, 44, 19.36, 528, 2.99370964];
    const data =  [
      { name: 'Electricity',  y: individual_means[0], avg: 7252.76 },
      { name: 'Flights', y: individual_means[1], avg: 602.45 },
      { name: 'Transport', y: individual_means[2], avg: 4515.27  },
      { name: 'Food',  y: individual_means[3], avg: 2267.96 },
      { name: 'Retail',  y: individual_means[4], avg: 22.41 }
    ];
    this.options.series[0].data = data;
    Highcharts.chart('container', this.options);
    this.barChartOptions.series[0].data = data;
    Highcharts.chart('barchartcontainer', this.barChartOptions);
  }



  getHouseHoldValue(): number {
    return parseInt(this.footPrintForm.get('household')?.value, 10);
  }

  getElectricityBill(): number {
    return parseInt(this.footPrintForm.get('electricityBill')?.value, 10);
  }
  getNoOfFlights(): number {
    return parseInt(this.footPrintForm.get('noOfFlights')?.value, 10);
  }
  getNoOfOwnCar(): string {
    return this.footPrintForm.get('ownCar')?.value;
  }
  getAvgDistance(): number {
    return parseInt(this.footPrintForm.get('avgDistance')?.value, 10);
  }

  getPublicTrans(): string {
    return this.footPrintForm.get('publicTrans')?.value;
  }

  getPublicShare(): string {
    return this.footPrintForm.get('publicShare')?.value;
  }

  getShareTrips(): number {
    return parseInt(this.footPrintForm.get('shareTrips')?.value, 10);
  }

  getVeg(): string {
    return this.footPrintForm.get('veg')?.value;
  }

  getNoOfMeat(): string {
    return this.footPrintForm.get('noOfMeat')?.value;
  }

  getAmountSpent(): number {
    return parseInt(this.footPrintForm.get('amountSpent')?.value, 10);
  }

}
