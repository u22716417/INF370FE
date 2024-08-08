import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';

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
  reportGeneratedBy: string = ''; // New property to hold the user's name

  constructor(
    private reportService: ReportService,
    private userManagementService: UserManagementService // Inject the service
  ) {}

  ngOnInit(): void {
    this.fetchCustomerSatisfactionReport();
    this.reportGeneratedDate = this.getCurrentDateAndTime();
    this.getCurrentUser(); // Fetch the current user
  }

  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

  getCurrentUser(): void {
    this.userManagementService.getUser().subscribe(
      (user) => {
        this.reportGeneratedBy = user.fullName; 
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  fetchCustomerSatisfactionReport(): void {
    this.reportService.getCustomerSatisfactionReport().subscribe(
      (data: any[]) => {
        console.log('Data received:', data); // Log the data received for debugging
  
        // Group the ratings by event and count the number of each rating
        const groupedData = data.reduce((acc, report) => {
          const eventName = report.eventName || 'Unknown Event';
          if (!acc[eventName]) {
            acc[eventName] = { 
              eventName: eventName, 
              ratingsCount: [0, 0, 0, 0, 0] // For ratings 1 to 5
            };
          }
          acc[eventName].ratingsCount[report.rating - 1] += 1; // Subtract 1 to index from 0
          return acc;
        }, {});
  
        // Convert the grouped object into an array
        this.customerSatisfaction = Object.values(groupedData);
        this.initializeChart();
      },
      (error) => {
        console.error('Error fetching customer satisfaction report', error);
      }
    );
  }
  
  initializeChart(): void {
    const categories = this.customerSatisfaction.map(report => report.eventName);
  
    // Prepare series data for the stacked chart
    const seriesData = [
      {
        name: "1 Star",
        data: this.customerSatisfaction.map(report => report.ratingsCount[0])
      },
      {
        name: "2 Stars",
        data: this.customerSatisfaction.map(report => report.ratingsCount[1])
      },
      {
        name: "3 Stars",
        data: this.customerSatisfaction.map(report => report.ratingsCount[2])
      },
      {
        name: "4 Stars",
        data: this.customerSatisfaction.map(report => report.ratingsCount[3])
      },
      {
        name: "5 Stars",
        data: this.customerSatisfaction.map(report => report.ratingsCount[4])
      }
    ];
  
    this.chartOptions = {
      series: seriesData,
      chart: {
        type: "bar",
        height: 350,
        stacked: true
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
          text: "Number of Ratings"
        }
      },
      tooltip: {
        y: {
          formatter: function(val: number): string {
            return val.toString() + " ratings";
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      legend: {
        position: 'top'
      },
      fill: {
        opacity: 1
      }
    };
  }
  

  exportToPDF(): void {
    const data = document.getElementById('reportContent'); // Capture the entire content
    if (data) {
      html2canvas(data).then((canvas: HTMLCanvasElement) => {
        const imgWidth = 208; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const position = 0;
  
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('CustomerSatisfactionReport.pdf');
      });
    } else {
      console.log('Report content element not found');
    }
  }
  
}
