import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-customer-satisfaction-report',
  templateUrl: './customer-satisfaction-report.component.html',
  styleUrls: ['./customer-satisfaction-report.component.css']
})
export class CustomerSatisfactionReportComponent implements OnInit {
  customerSatisfaction: any[] = [];
  public chartOptions: Partial<ChartOptions> | any;
  reportGeneratedDate: string = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchCustomerSatisfactionReport();
    this.reportGeneratedDate = this.getCurrentDateAndTime();
  }

  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

  fetchCustomerSatisfactionReport(): void {
    this.reportService.getCustomerSatisfactionReport().subscribe(
      (data: any[]) => {
        console.log('Data received:', data); // Log the data received for debugging
        this.customerSatisfaction = data;
        this.initializeChart();
      },
      (error) => {
        console.error('Error fetching customer satisfaction report', error);
      }
    );
  }

  initializeChart(): void {
    const categories = this.customerSatisfaction.map(report => report.eventName || 'Unknown Event');
    const seriesData = this.customerSatisfaction.map(report => report.rating);

    this.chartOptions = {
      series: [{
        name: "Customer Satisfaction",
        data: seriesData
      }],
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "Customer Satisfaction Report"
      },
      xaxis: {
        categories: categories,
        title: {
          text: "Events"
        }
      },
      yaxis: {
        title: {
          text: "Ratings"
        }
      },
      tooltip: {
        y: {
          formatter: function(val: number): string {
            return val + " stars";
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
