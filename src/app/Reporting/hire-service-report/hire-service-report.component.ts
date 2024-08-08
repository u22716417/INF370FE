import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { ReportService } from '../report.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-hire-service-report',
  templateUrl: './hire-service-report.component.html',
  styleUrls: ['./hire-service-report.component.css']
})
export class HireServiceReportComponent implements OnInit {
  hireService: any[] = [];
  public chartOptions: Partial<ChartOptions> | any;
  reportGeneratedDate: string = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    
  }

  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

getHireServiceReport() {

}

}
