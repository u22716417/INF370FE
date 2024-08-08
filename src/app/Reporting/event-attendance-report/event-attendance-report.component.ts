
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';
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
  selector: 'app-event-attendance-report',
  templateUrl: './event-attendance-report.component.html',
  styleUrls: ['./event-attendance-report.component.css']
})
export class EventAttendanceReportComponent implements OnInit {
  eventAttendance: any[] = [];
  public chartOptions: Partial<ChartOptions> | any;
  reportGeneratedDate: string = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchEventAttendanceReport();
    this.reportGeneratedDate = this.getCurrentDateAndTime();
  }

  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

  fetchEventAttendanceReport(): void {
    this.reportService.getCustomerSatisfactionReport().subscribe(
      (data: any[]) => {
        console.log('Data received:', data); // Log the data received for debugging
        this.eventAttendance = data;
        this.initializeChart();
      },
      (error) => {
        console.error('Error fetching event attendance report', error);
      }
    );
  }
  initializeChart(): void {
    // Aggregate data by title
    const titleCounts: { [key: string]: number } = {};
  
    this.eventAttendance.forEach(attendee => {
      const title = attendee.title || 'Unknown Title';
      if (titleCounts[title]) {
        titleCounts[title]++;
      } else {
        titleCounts[title] = 1;
      }
    });
  
    // Prepare data for the pie chart
    const categories = Object.keys(titleCounts);
    const seriesData = Object.values(titleCounts);
  
    this.chartOptions = {
      series: seriesData,
      chart: {
        type: 'pie',
        height: 350
      },
      labels: categories,
      title: {
        text: 'Event Attendance by Title'
      },
      tooltip: {
        y: {
          formatter: function(val: number): string {
            return val + " attendees";
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
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
        pdf.save('EventAttendanceReport.pdf');
      });
    } else {
      console.log('Table element not found'); // Debug log
    }
  }
    };
