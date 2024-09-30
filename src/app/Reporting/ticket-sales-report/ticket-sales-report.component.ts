import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { dA } from '@fullcalendar/core/internal-common';
import autoTable from 'jspdf-autotable';

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
  public startDate: string | null = '';
  public endDate: string | null  = '';
  filteredSales = this.ticketSales;
  serviceReport: any[] = [];
  filteredServiceReport: any[] = [];

  constructor(private ticketSalesReportService: ReportService,  private userManagementService: UserManagementService) {}

  public months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];
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

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('reportTable'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'soldTicketsReport');
  
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'sold-tickets-report.xlsx');
  }

  populateDates(event: any): void {
    const selectedMonth = event.target.value;
    const currentYear = new Date().getFullYear();
    
    if (selectedMonth) {
      const firstDay = new Date(currentYear, parseInt(selectedMonth) - 1, 1);
      const lastDay = new Date(currentYear, parseInt(selectedMonth), 0);

      this.startDate = this.formatDate(firstDay);
      this.endDate = this.formatDate(lastDay);    
    }
    this.filterSalesByDate();
    this.filterServiceReportByDate(); // Filter service report data by date
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  filterServiceReportByDate(): void {
    this.filteredServiceReport = this.serviceReport.filter(service => {
      const serviceDate = new Date(service.serviceDate);
      const startDate = this.startDate ? new Date(this.startDate) : null;
      const endDate = this.endDate ? new Date(this.endDate) : null;
    
      
      // If both dates are provided, filter between the dates
      if (startDate && endDate) {
        return serviceDate >= startDate && serviceDate <= endDate;
      }
      // If only start date is provided, filter from that date onward
      if (startDate) {
        return serviceDate >= startDate;
      }
      // If only end date is provided, filter up to that date
      if (endDate) {
        return serviceDate <= endDate;
      }
      // If neither date is provided, return all results
      return true;
    });
  }
 
  setDefaultDates(): void {
    const currentYear = new Date().getFullYear();
    this.startDate = `${currentYear}-01-01`; // Beginning of the current year
    this.endDate = `${currentYear}-12-31`;   // End of the current year
    this.fetchTicketSalesReport();
    this.filterSalesByDate();
  }

  filterSalesByDate(): void {
    this.filteredSales = this.ticketSales.filter(sale => {
      const eventDate = new Date(sale.eventdate);
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
  
  
  

  fetchTicketSalesReport(): void {
    this.ticketSalesReportService.getTicketSalesReport().subscribe(
      (data: any[]) => {
        console.log(data);
        this.ticketSales = [...data];
        this.filteredSales =  [...data];
        this.filterSalesByDate();
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
      }
    );


    this.ticketSalesReportService.getServiceReportData().subscribe(s=>{
      console.log(s);
      this.serviceReport = [...s];
      this.filteredServiceReport = [...s];
    })

  }

  updateChartOptions(): void {
    // Expanded array of colors
    const colors = [
        '#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0', 
        '#546E7A', '#26a69a', '#FFB400', '#FF66C4', '#6B5B95', 
        '#F7B7A3', '#D5AAFF', '#F2A72C', '#9F6F5F', '#6D8EAD'
    ];

    const categories = this.filteredSales.map(sale => sale.event_name);
    const data = this.filteredSales.map(sale => sale.number_of_tickets_sold);

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



getTotalServiceQuantity(): number {
  return this.filteredServiceReport.length;
}
  getTotalServiceSales(): number {
    console.log("Ping!!!!!!!!!!!!")
    
    return this.filteredServiceReport.reduce((total, report) => {
      return total + (report.servicePrice);
    }, 0);
  }


getTotalQuantity(): number {
  return this.filteredSales.reduce((total, report) => {
    return total + (report.number_of_tickets_sold);
  }, 0);
}
  getTotalSales(): number {
    return this.filteredSales.reduce((total, report) => {
      return total + (report.ticket_price * report.number_of_tickets_sold);
    }, 0);
  }

  exportToPDF(): void {
    const chartElement = document.getElementById('chart');
    const tableElement = document.getElementById('reportTable');
    const date = new Date().toLocaleDateString();
    const generatedBy = this.reportGeneratedBy;
  
    if (chartElement && tableElement) {
        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');
  
        // Add the logo image
        const logoImg = new Image();
        logoImg.src = 'assets/images/Protea-logo.png';  // Path to the image
        logoImg.onload = () => {
            // Add the logo image to the PDF
            pdf.addImage(logoImg, 'PNG', 105 - 15, 10, 30, 30); // Centered image at top
  
            // Add the title below the image
            pdf.setFontSize(18);
            pdf.text('Ticket Sales Report', 105, 50, { align: 'center' });
  
            // Add date and generated by info
            pdf.setFontSize(12);
            pdf.text(`Date: ${date}`, 10, 60);
            pdf.text(`Generated by: ${generatedBy}`, 10, 65);
  
            // Capture the chart as an image using html2canvas
            html2canvas(chartElement, { scale: 2 }).then(chartCanvas => {
                const chartImgData = chartCanvas.toDataURL('image/png');
                const chartImgWidth = 190; // Width in mm (adjust according to your needs)
                const chartImgHeight = (chartCanvas.height * chartImgWidth) / chartCanvas.width; // Height in mm proportional to the chart's original aspect ratio
                pdf.addImage(chartImgData, 'PNG', 10, 70, chartImgWidth, chartImgHeight);
  
                // Add the table data using autoTable
                autoTable(pdf,{
                    startY: 80 + chartImgHeight,  // Position to start the table after the chart
                    html: '#reportTable',  // ID of the table element
                    useCss: true,  // Optionally use styles from the HTML table
                    theme: 'striped',  // Table theme, can be 'striped', 'grid', 'plain'
                    headStyles: { fillColor: [41, 128, 185] },  // Customize header style
                    styles: { cellPadding: 2, fontSize: 10 }  // Customize table cell styles
                });

                
  
                // Save the PDF
                pdf.save('TicketSalesReport.pdf');
            }).catch(error => {
                console.error('Error generating chart canvas:', error);
            });
        };
    } else {
        console.error('Could not find chart or table element.');
    }
  }

 
}


