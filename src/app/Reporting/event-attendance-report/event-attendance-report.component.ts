import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { ChartComponent, ApexChart, ApexDataLabels, ApexTooltip, ApexLegend } from 'ng-apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
export type EventAttendanceChartOptions = {
  series: number[];
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-event-attendance-report',
  templateUrl: './event-attendance-report.component.html',
  styleUrls: ['./event-attendance-report.component.css']
})
export class EventAttendanceReportComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public eventAttendanceChartOptions: Partial<EventAttendanceChartOptions> | any;
  attendanceRecords: any[] = [];
  detailedAttendanceRecords: any[] = [];
  reportGeneratedDate = "";
  reportGeneratedBy: string = '';
  startDate = "";
  endDate = "";
  filteredEventAttendance = this.attendanceRecords;
  private subscriptions: Subscription[] = [];

  constructor(private reportService: ReportService, private userManagementService: UserManagementService) {
    this.eventAttendanceChartOptions = {
      series: [],
      chart: {
        type: 'pie',
        height: 265,
        fontFamily: 'Rubik, sans-serif'
      },
      labels: [],
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          return opts.w.config.labels[opts.seriesIndex] + ": " + val.toFixed(2) + "%";
        }
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number) => {
            return val + "%";
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      colors: ["#0d6efd", "#009efb", "#6771dc", "#ffc107", "#dc3545"]
    };
  }

  ngOnInit(): void {
    this.fetchEventAttendanceReport();
    this.fetchDetailedAttendanceRecords();
    this.getCurrentUser();
  }

  fetchEventAttendanceReport(): void {
    this.reportService.getEventAttendanceReport().subscribe(
      (data: any[]) => {
        this.attendanceRecords = [...data];
        this.filteredEventAttendance = [...data];
        this.updateChartOptions(); // Update the chart with the new data
        this.reportGeneratedDate = this.getCurrentDateAndTime(); // Set report generated date here
      },
      (error) => {
        console.error('Error fetching event attendance report', error);
      }
    );
  }

  fetchDetailedAttendanceRecords(): void {
    this.reportService.getEventAttendanceDetails().subscribe(
      (data: any[]) => {
        this.detailedAttendanceRecords = [...data];
        this.filteredEventAttendance = [...data]; // Set initial table data
      },
      (error) => {
        console.error('Error fetching detailed attendance records', error);
      }
    );
  }

  updateChartOptions(): void {
    const eventNames = this.attendanceRecords.map(record => record.eventName);
    const attendanceCounts = this.attendanceRecords.map(record => record.eventAttendanceCount);
  
    // Log values for debugging
    console.log('Event Names:', eventNames);
    console.log('Attendance Counts:', attendanceCounts);
    console.log('Event :', this.attendanceRecords);
    if (eventNames.length > 0 && attendanceCounts.length > 0) {
      this.eventAttendanceChartOptions = {
        ...this.eventAttendanceChartOptions,
        labels: eventNames,
        series: attendanceCounts
      };
    } else {
      console.warn('No data available for chart.');
    }
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

  filterAttendanceByDate(): void {
    this.filteredEventAttendance = this.detailedAttendanceRecords.filter(record => {
      const eventDate = new Date(record.eventDate);
      const startDate = this.startDate ? new Date(this.startDate) : null;
      const endDate = this.endDate ? new Date(this.endDate) : null;

      if (startDate && endDate) {
        return eventDate >= startDate && eventDate <= endDate;
      }
      if (startDate) {
        return eventDate >= startDate;
      }
      if (endDate) {
        return eventDate <= endDate;
      }
      return true;
    });

    console.log(this.filteredEventAttendance);
    this.updateChartOptions();
  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('reportTable'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'soldTicketsReport');
  
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'event-attendance-report.xlsx');
  }
  exportToPDF(): void {
    const data = document.getElementById('reportContent');
    if (data) {
        html2canvas(data).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight - pageHeight;

            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save('EventAttendanceReport.pdf');
        }).catch(error => {
            console.error('Error generating PDF:', error);
        });
    } else {
        console.error('Element with ID reportContent not found.');
    }
}

} 
