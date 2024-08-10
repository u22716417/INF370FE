import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';
import { ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions, ApexFill, ApexAxisChartSeries, ApexYAxis } from 'ng-apexcharts';

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
  UnsoldTickets: any[] = [];
  chartOptions: ChartOptions = {
    series: [{ name: "Unsold Tickets", data: [] }],
    chart: { type: "bar", height: 350 },
    plotOptions: { bar: { horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: { categories: [], title: { text: 'Events' } },
    yaxis: { title: { text: 'Number of Tickets' } },
    title: { text: "Report on Unsold Tickets by Event" },
    fill: { opacity: 1 }
  };
  currentUserFullName = "";
  reportGeneratedDateTime = "";
  startDate = '';
  endDate = '';
  filteredUnsoldTickets = this.UnsoldTickets;
  eventNames: string[] = [];
  eventsfromDb: any[] = [];
  selectedEvent: string = '';

  constructor(
    private ticketSalesReportService: ReportService,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.fetchTicketSalesReport();
    this.getUserFullNameAndDateTime();
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

  fetchTicketSalesReport(month: string = ''): void {
    this.ticketSalesReportService.getUnsoldTicketsReport(month).subscribe(
      (data: any[]) => {
        this.UnsoldTickets = data;
        this.eventNames = this.getUniqueEventNames(); // Update the event names for dropdown
        this.updateChartOptions(data);
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
        alert('Error fetching ticket sales report: ' + error.message); 
      }
    );
  }

  getUniqueEventNames(): string[] {
    return [...new Set(this.UnsoldTickets.map(ticket => ticket.eventName))];
  }

  onEventChange(event: any): void {
    this.selectedEvent = event.target.value;
    this.filterUnsoldTicketsByEvent();
  }

  filterUnsoldTicketsByEvent(): void {
    this.filteredUnsoldTickets = this.UnsoldTickets.filter(ticket => 
      this.selectedEvent === '' || ticket.eventName === this.selectedEvent
    );
    this.updateChartOptions(this.filteredUnsoldTickets);
  }

  filterUnsoldTicketsByDate(): void {
    if (this.startDate || this.endDate) {
      this.filteredUnsoldTickets = this.UnsoldTickets.filter(ticket => 
        new Date(ticket.eventDate) >= new Date(this.startDate || '') &&
        new Date(ticket.eventDate) <= new Date(this.endDate || '')
      );
    } else {
      this.filteredUnsoldTickets = this.UnsoldTickets;
    }
    this.updateChartOptions(this.filteredUnsoldTickets);
  }

  updateChartOptions(data: any[]): void {
    const colors = ['#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0', '#546E7A', '#26a69a', '#FFB400', '#FF66C4', '#6B5B95'];
    const categories = data.map(ticket => ticket.eventName);
    const unsoldTicketsData = data.map(ticket => ticket.unsoldTickets);
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

  exportToPDF(): void {
    const chartElement = document.getElementById('chart');
    const tableElement = document.getElementById('reportTable');
    const date = new Date().toLocaleDateString();
    const generatedBy = this.currentUserFullName;

    if (chartElement && tableElement) {
      Promise.all([
        html2canvas(chartElement),
        html2canvas(tableElement)
      ]).then(([chartCanvas, tableCanvas]) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFontSize(18);
        pdf.text('Unsold Ticket Sales Report', 105, 20, { align: 'center' });
        pdf.setFontSize(12);
        pdf.text(`Date: ${date}`, 10, 30);
        pdf.text(`Generated by: ${generatedBy}`, 10, 35);

        const chartImgData = chartCanvas.toDataURL('image/png');
        const chartWidth = 190;
        const chartHeight = chartCanvas.height * (chartWidth / chartCanvas.width);
        pdf.addImage(chartImgData, 'PNG', 10, 40, chartWidth, chartHeight);

        const tableImgData = tableCanvas.toDataURL('image/png');
        pdf.addPage();
        pdf.addImage(tableImgData, 'PNG', 10, 10, 190, 0);

        pdf.save('unsold-tickets-report.pdf');
      });
    } else {
      console.error('Could not find chart or table element.');
    }
  }
}
