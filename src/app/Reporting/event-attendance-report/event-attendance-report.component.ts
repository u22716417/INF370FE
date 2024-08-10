import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { ChartComponent, ApexChart, ApexDataLabels, ApexTooltip, ApexLegend } from 'ng-apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
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
  public eventAttendanceChartOptions: Partial<EventAttendanceChartOptions>| any;;
  attendanceRecords: any[] = [];
  reportGeneratedDate: string = '';//NB TIL FILTERED
  reportGeneratedBy: string = '';
  public startDate: string = '';
  public endDate: string  = '';
  filteredEventAttendance = this.attendanceRecords;

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
    this.reportService.getEventAttendanceReport().subscribe(response => {
      this.attendanceRecords = [...response];
      this.updateChartOptions();
      this.reportGeneratedDate = this.getCurrentDateAndTime();
    this.getCurrentUser(); 
    });
  }
  getCurrentUser(): void {
    this.userManagementService.getUser().subscribe(
      (user) => {
        this.reportGeneratedBy = user.fullName; 
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );//nb
  }
  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }
  filterAttendanceByDate(): void {
    this.filteredEventAttendance = this.attendanceRecords.filter(record => {
      const eventDate = new Date(record.eventDate);
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
  fetchEventAttendanceReport(): void {
    this.reportService.getEventAttendanceReport().subscribe(
      (data: any[]) => {
        this.attendanceRecords = [...data];
        this.filteredEventAttendance =  [...data];

        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching event attendance report', error);
      }
    );
  }


  updateChartOptions(): void {
    const eventNames = this.attendanceRecords.map(record => record.eventName);
    const attendanceCounts = this.attendanceRecords.map(record => record.evenAttendanceCount);

    this.eventAttendanceChartOptions = {
      ...this.eventAttendanceChartOptions,
      labels: eventNames,
      series: attendanceCounts
    };
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
        pdf.save('EventAttendanceReport.pdf');
      });
    }
  }
}
