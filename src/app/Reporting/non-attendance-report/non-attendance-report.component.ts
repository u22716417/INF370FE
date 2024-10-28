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
  selector: 'app-non-attendance-report',
  templateUrl: './non-attendance-report.component.html',
  styleUrls: ['./non-attendance-report.component.css']
})
export class NonAttendanceReportComponent implements OnInit {
  eventNonAttendance: any[] = [];
  ticketSales: any[] = [];
  filteredEventsNonAttendance: any[] = [];
  attendanceRecords: any[] = [];
  public chartOptions: Partial<ChartOptions> | any;
  reportGeneratedDate: string = '';
  reportGeneratedBy: string = '';
  public startDate: string | null = '';
  public endDate: string | null  = '';
  events: any[] = [];
  eventNames: string[] = [];
  eventsfromDb: any[] = [];
  selectedEvent: string = '';

  constructor( private reportService: ReportService, private userManagementService: UserManagementService ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

  getUniqueEventNames(): string[] {
    const eventNames = this.eventsfromDb.map(event => event.eventName);
    return [...new Set(eventNames)];
  }

  onEventChange(event: any): void {
    this.selectedEvent = event.target.value; // Capture selected event
    this.filterEventNonAttendance();  // Filter data and update chart
  }

  filterEventNonAttendance(): void {
    if (this.selectedEvent !== '') {
      this.filteredEventsNonAttendance = this.eventNonAttendance.filter(report => report.eventName === this.selectedEvent);
    } else {
      this.filteredEventsNonAttendance = [...this.eventNonAttendance];
    }
    this.initializeChart();  // Regenerate chart with filtered data
  }

  getEventNonAttendanceReport(): void {
    this.reportService.getEventNonAttendanceReport().subscribe(
      (data: any[]) => {
        this.eventNonAttendance = [...data];
        this.eventsfromDb = [...data];  
        this.initializeChart();
      },
      (error) => {
        console.error('Error fetching sales attendance report', error);
      }
    );
  }

  initializeChart(): void {
    // Extract event names, ticket sales, and attendance counts
    const eventNames = this.eventNonAttendance.map(record => record.eventName);
    const ticketsSold = this.eventNonAttendance.map(record => record.NumberOfTicketsSold);
    const attendanceCounts = this.eventNonAttendance.map(record => record.EventAttendanceCount);
  
    // Calculate non-attendance counts (tickets sold - attendance count)
    const nonAttendanceCounts = ticketsSold.map((sold, index) => sold - attendanceCounts[index]);
  
    this.chartOptions = {
      series: [
        {
          name: 'Tickets Sold',
          data: ticketsSold,
        },
        {
          name: 'Non Attendance Count',
          data: nonAttendanceCounts
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Sales and Attendance Report',
        align: 'center'
      },
      xaxis: {
        categories: eventNames,
        title: {
          text: 'Events'
        }
      },
      dataLabels: {
        enabled: true
      },
      colors: ['#0B2F9F', '#06D001']
    };
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
                pdf.save('EventNonAttendance.pdf');
            }).catch(error => {
                console.error('Error generating chart canvas:', error);
            });
        };
    } else {
        console.error('Could not find chart or table element.');
    }
  }

}



