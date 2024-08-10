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
    this.filteredSales = this.ticketSales.filter(sale => {
      const eventDate = new Date(sale.eventDate);
      const startDate = this.startDate ? new Date(this.startDate) : null;
      const endDate = this.endDate ? new Date(this.endDate) : null;
  
      // If both dates are provided, filter between the dates
      if (startDate && endDate) {
        return eventDate >= startDate && eventDate <= endDate;
      }
      // If only start date is provided, filter from that date onward
      if (startDate) {
        return eventDate >= startDate;
      }
      // If only end date is provided, filter up to that date
      if (endDate) {
        return eventDate <= endDate;
      }
      // If neither date is provided, return all results
      return true;
    });
  
    this.updateChartOptions();
  }
  

  exportToPDF(): void {
    const data = document.getElementById('reportContent');
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
    // Expanded array of colors
    const colors = [
        '#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0', 
        '#546E7A', '#26a69a', '#FFB400', '#FF66C4', '#6B5B95', 
        '#F7B7A3', '#D5AAFF', '#F2A72C', '#9F6F5F', '#6D8EAD'
    ];

    const categories = this.filteredSales.map(sale => sale.eventName);
    const data = this.filteredSales.map(sale => sale.unsoldTickets);

    // Ensure the number of colors is at least as many as data points
    const chartColors = colors.slice(0, data.length);

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
      },
      plotOptions: {
        bar: {
          distributed: true // Distribute colors to individual bars
        }
      },
      colors: chartColors // Apply colors to the bars
    };
}



  getTotalSales(): number {
    return this.filteredSales.reduce((total, report) => {
      return total + (report.ticketPrice * report.unsoldTickets);
    }, 0);
  }
}
