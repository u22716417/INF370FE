import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
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
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-ticket-sales-report',
  templateUrl: './ticket-sales-report.component.html',
  styleUrls: ['./ticket-sales-report.component.css']
})
export class TicketSalesReportComponent implements OnInit {
  
  ticketSales: any[] = [];
  public chartOptions: Partial<ChartOptions> | any;
  reportGeneratedDate: string = '';
  reportGeneratedBy: string = '';
  public startDate: string = '';
  public endDate: string  = '';
  filteredSales = this.ticketSales;
  constructor(private ticketSalesReportService: ReportService,  private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.fetchTicketSalesReport();
    this.reportGeneratedDate = this.getCurrentDateAndTime();
    this.getCurrentUser(); 
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
  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

  filterSalesByDate(): void {
    if (this.startDate || this.endDate) {
      console.log("Ping");
      this.filteredSales = this.ticketSales.filter(sale =>
        new Date(sale.eventDate) >= new Date(this.startDate) &&
        new Date(sale.eventDate) <= new Date(this.endDate)
      );
    } else {
     
      this.filteredSales = this.ticketSales;
    }
    this.updateChartOptions();
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
        pdf.save('TicketSalesReport.pdf');
      });
    }
  }

  fetchTicketSalesReport(): void {
    this.ticketSalesReportService.getTicketSalesReport().subscribe(
      (data: any[]) => {
        this.ticketSales = [...data];
        this.filteredSales =  [...data];

        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
      }
    );
  }

  updateChartOptions(): void {
    
   
    const categories = this.filteredSales.map(sale => sale.eventName);
    const data = this.filteredSales.map(sale => sale.unsoldTickets);
    this.chartOptions = {
      series: [{
        name: "Ticket Sales",
        data: data
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: categories
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Ticket Sales per Event",
        align: 'center'
      }
    };
  }
  getTotalSales(): number {
    return this.filteredSales.reduce((total, report) => {
      return total + (report.ticketPrice * report.unsoldTickets);
    }, 0);
  }
}
