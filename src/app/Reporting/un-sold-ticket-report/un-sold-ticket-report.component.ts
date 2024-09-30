import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';
import { ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions, ApexFill, ApexAxisChartSeries, ApexYAxis } from 'ng-apexcharts';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors?: string[];
  yaxis?: ApexYAxis;
};

@Component({
  selector: 'app-un-sold-ticket-report',
  templateUrl: './un-sold-ticket-report.component.html',
  styleUrls: ['./un-sold-ticket-report.component.css']
})
export class UnSoldTicketReportComponent implements OnInit {
  @ViewChild("chart") chartOptions: ChartOptions | undefined;

  UnsoldTickets: any[] = [];


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

  currentUserFullName = "";
  reportGeneratedDateTime = "";
  startDate = '';
  endDate = '';
  filteredUnsoldTickets: any[] =[];
  eventNames: string[] = [];
  eventsfromDb: any[] = [];
  selectedEvent: string = '';
  total: number = 0;
  constructor(
    private ticketSalesReportService: ReportService,
    private userManagementService: UserManagementService
  ) {


    this.chartOptions = {
      series: [{ name: "Unsold Tickets", data: [] }],
      chart: { type: "bar", height: 350 },
      plotOptions: { bar: { horizontal: false } },
      dataLabels: { enabled: false },
      xaxis: { categories: [], title: { text: 'Events' } },
      yaxis: { title: { text: 'Number of Tickets' } },
      title: { text: "Report on Unsold Tickets by Event" },
      fill: { opacity: 1 }
    };

  }

  ngOnInit(): void {
    this.setDefaultDates();
    this.fetchTicketSalesReport();
    this.getUserFullNameAndDateTime();
    this.calculateTotal();
  }

  setDefaultDates(): void {
    const currentYear = new Date().getFullYear();
    this.startDate = `${currentYear}-01-01`; // Beginning of the current year
    this.endDate = `${currentYear}-12-31`;   // End of the current year
    this.fetchTicketSalesReport();
    this.filterUnsoldTicketsByDate();

  }

  getUserFullNameAndDateTime(): void {
    this.userManagementService.getUser().subscribe(response => {
      this.currentUserFullName = response.fullName; 
      this.reportGeneratedDateTime = new Date().toLocaleString(); // Get the current date and time
    }, error => {
      console.error('Error fetching user data', error);
      alert('Error fetching user data: ' + error.message);
    });
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
    this.filterUnsoldTicketsByDate();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  calculateTotal() {
    console.log( "---------------->",this.filteredUnsoldTickets )
    
    console.log("total:  "+this.total)
  }

  fetchTicketSalesReport(month: string = ''): void {
    this.ticketSalesReportService.getUnsoldTicketsReport().subscribe(
      (data: any[]) => {
        this.UnsoldTickets = [...data];
        this.eventNames = this.getUniqueEventNames(); // Update the event names for dropdown
        console.log(data);
        this.updateChartOptions(this.UnsoldTickets);
        this.filterUnsoldTicketsByDate();

        this.total = this.filteredUnsoldTickets.reduce((sum, report) => sum + (report.ticket_price * report.number_of_tickets_sold), 0);
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
        alert('Error fetching ticket sales report: ' + error.message); 
      }
    );
  }

  getUniqueEventNames(): string[] {
    return [...new Set(this.UnsoldTickets.map(ticket => ticket.event_name))];
  }

  onEventChange(event: any): void {
    this.selectedEvent = event.target.value;
    this.filterUnsoldTicketsByEvent();
  }

  filterUnsoldTicketsByEvent(): void {
    this.filteredUnsoldTickets = this.UnsoldTickets.filter(ticket => 
      this.selectedEvent === '' || ticket.event_name === this.selectedEvent
    );
    this.total = this.filteredUnsoldTickets.reduce((sum, report) => sum + (report.ticket_price * report.number_of_tickets_sold), 0);
    this.updateChartOptions(this.filteredUnsoldTickets);
  }

  filterUnsoldTicketsByDate(): void {
    if (this.startDate || this.endDate) {
      this.filteredUnsoldTickets = this.UnsoldTickets.filter(ticket => 
        new Date(ticket.eventdate) >= new Date(this.startDate || '') &&
        new Date(ticket.eventdate) <= new Date(this.endDate || '')
      );
    } else {
      this.filteredUnsoldTickets = [...this.UnsoldTickets];
    }
    this.updateChartOptions(this.filteredUnsoldTickets);
    this.total = this.filteredUnsoldTickets.reduce((sum, report) => sum + (report.ticket_price * report.number_of_tickets_sold), 0);

  }

  updateChartOptions(data: any[]): void {
    const colors = ['#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0', '#546E7A', '#26a69a', '#FFB400', '#FF66C4', '#6B5B95'];
    const categories = data.map(ticket => ticket.event_name);
    const unsoldTicketsData = data.map(ticket => ticket.number_of_tickets_sold);
    const chartColors = colors.slice(0, unsoldTicketsData.length);

    this.chartOptions = {
      series: [{ name: "Unsold Tickets", data: unsoldTicketsData }],
      chart: { type: 'bar', height: 350 },
      xaxis: { categories: categories, title: { text: 'Events' } },
      dataLabels: { enabled: false },
      title: { text: "Unsold Tickets by Event", align: 'center' },
      plotOptions: { bar: { distributed: true } },
      colors: chartColors,
      fill: { opacity: 1 }
    };
  }


exportToExcel(): void {
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('reportTable'));
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'soldTicketsReport');

  // Generate Excel file and trigger download
  XLSX.writeFile(wb, 'sold-tickets-report.xlsx');

    
}

exportToPDF(): void {
  const chartElement = document.getElementById('chart');
  const tableElement = document.getElementById('reportTable');
  const date = new Date().toLocaleDateString();
  const generatedBy = this.currentUserFullName;

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
          pdf.text('Unsold Ticket Report', 105, 50, { align: 'center' });

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
              pdf.save('unsold-tickets-report.pdf');
          }).catch(error => {
              console.error('Error generating chart canvas:', error);
          });
      };
  } else {
      console.error('Could not find chart or table element.');
  }
}
}