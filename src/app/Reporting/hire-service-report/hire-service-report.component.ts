import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexPlotOptions
} from 'ng-apexcharts';
import { ReportService } from '../report.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
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

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportGeneratedDate = this.getCurrentDateAndTime();
    this.getHireServiceReport();
  }

  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

  getHireServiceReport() {
    this.reportService.getHireServiceReport().subscribe(
      (data: any[]) => {
        console.log('Data received:', data); // Log the data received for debugging
        this.hireService= data;
      },
      (error) => {
        console.error('Error fetching hire service report', error);
      }
    );
  }

  generateChart() {
    this.chartOptions = {
      series: this.hireService.map(service => service.value),
      chart: {
        type: 'pie',
        width: 380
      },
      labels: this.hireService.map(service => service.category),
      dataLabels: {
        enabled: true
      },
      title: {
        text: 'Hire Service Report for 2024',
        align: 'center'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
          }
        }
      }
    };
  }
  exportToPDF(): void {
    const data = document.getElementById('reportTable');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        const position = 0;

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('CustomerSatisfactionReport.pdf');
      });
    } else {
      console.log('Table element not found'); // Debug log
    }
  }
}
