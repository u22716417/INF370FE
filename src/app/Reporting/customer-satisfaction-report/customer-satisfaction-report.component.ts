import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
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
  filteredCustomerSatisfaction: any[] = [];
  public chartOptions: Partial<ChartOptions> | any;
  reportGeneratedDate: string = '';
  reportGeneratedBy: string = ''; // New property to hold the user's name
  events: any[] = [];
  eventsfromDb: any[] = [];
  selectedEvent: string = '';

  constructor(
    private reportService: ReportService,
    private userManagementService: UserManagementService // Inject the service
  ) {}

  ngOnInit(): void {
    this.fetchCustomerSatisfactionReport();
    this.reportGeneratedDate = this.getCurrentDateAndTime();
    this.getCurrentUser(); // Fetch the current user
    this.events = [...this.getUniqueEventNames()];
  }

  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

  onEventChange(event: any) {
    this.selectedEvent = event.target.value;
    this.filterCustomerSatisfaction();
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

  getUniqueEventNames(): string[] {
    const eventNames = this.eventsfromDb.map(event => event.eventName);
    return [...new Set(eventNames)];
  }

  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('reportTable'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'customerSatisfactionReport');
  
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'customer-satisfaction-report.xlsx');
  }

  fetchCustomerSatisfactionReport(): void {
    this.reportService.getCustomerSatisfactionReport().subscribe(
      (data: any[]) => {
        this.eventsfromDb = [...data];
        this.groupCustomerSatisfactionData(data);
        this.initializeChart();
      },
      (error) => {
        console.error('Error fetching customer satisfaction report', error);
      }
    );
  }

  groupCustomerSatisfactionData(data: any[]): void {
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

    this.customerSatisfaction = Object.values(groupedData);
    this.filteredCustomerSatisfaction = [...this.customerSatisfaction];
  }

  filterCustomerSatisfaction(): void {
    if (this.selectedEvent) {
      this.filteredCustomerSatisfaction = this.customerSatisfaction.filter(report => report.eventName === this.selectedEvent);
    } else {
      this.filteredCustomerSatisfaction = [...this.customerSatisfaction];
    }
    this.initializeChart();
  }

  initializeChart(): void {
    const categories = this.filteredCustomerSatisfaction.map(report => report.eventName);
  
    
    const colors = ["#FF0000", "#FFA500", "#FFD700", "#ADFF2F", "#008000"]; // Red, Orange, Gold, GreenYellow, Green
  
    const seriesData = [
      {
        name: "1 Star",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[0]),
        color: colors[0] // Red for 1 Star
      },
      {
        name: "2 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[1]),
        color: colors[1] // Orange for 2 Stars
      },
      {
        name: "3 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[2]),
        color: colors[2] // Gold for 3 Stars
      },
      {
        name: "4 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[3]),
        color: colors[3] // GreenYellow for 4 Stars
      },
      {
        name: "5 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[4]),
        color: colors[4] // Green for 5 Stars
      }
    ];
  
    this.chartOptions = {
      series: seriesData,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
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
