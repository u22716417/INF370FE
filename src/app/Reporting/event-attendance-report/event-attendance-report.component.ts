import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries; // For a pie chart, use ApexNonAxisChartSeries
  chart: ApexChart;
  labels: string[]; // Labels for the pie chart slices
  responsive: ApexResponsive[];
  legend: ApexLegend; // Add legend configuration
};

@Component({
  selector: 'app-event-attendance-report',
  templateUrl: './event-attendance-report.component.html',
  styleUrls: ['./event-attendance-report.component.css']
})
export class EventAttendanceReportComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> | any = {};
  public eventAttendance: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    const eventId = 1; // Replace with the actual event ID
    this.reportService.getEventAttendanceReport(eventId).subscribe(
      (data) => {
        this.eventAttendance = data;
        this.generateEventAttendanceChart();
      },
      (error) => {
        console.error('Error fetching event attendance report', error);
      }
    );
  }

  generateEventAttendanceChart(): void {
    const eventNames = this.eventAttendance.map((item) => item.eventName);
    const attendanceQuantities = this.eventAttendance.map((item) => item.attendanceQuantity);

    this.chartOptions = {
      series: attendanceQuantities,
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: eventNames,
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }



//--------------------------------------------------------------

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
      }).catch(error => {
        console.error('Error exporting to PDF', error);
        alert('Error exporting to PDF: ' + error.message);
      });
    } else {
      console.error('No element found with ID "reportTable"');
      alert('No element found with ID "reportTable".');
    }
  }

}    

