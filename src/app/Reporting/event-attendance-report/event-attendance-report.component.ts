
// import { Component, OnInit } from '@angular/core';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { ReportService } from '../report.service';
// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexYAxis,
//   ApexTitleSubtitle,
//   ApexTooltip
// } from 'ng-apexcharts';
// import { ApexOptions } from 'apexcharts';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   yaxis: ApexYAxis;
//   dataLabels: ApexDataLabels;
//   title: ApexTitleSubtitle;
//   tooltip: ApexTooltip;
// };

// @Component({
//   selector: 'app-event-attendance-report',
//   templateUrl: './event-attendance-report.component.html',
//   styleUrls: ['./event-attendance-report.component.css']
// })
// export class EventAttendanceReportComponent implements OnInit {
//   eventAttendances: any[] = [];
//   public chartOptions: ApexOptions;
//   checkInId: number = 1;

//   constructor(private EventAttendanceService: ReportService) {
//     this.chartOptions = {
//       series: [],
//       chart: {
//         type: "pie",
//         height: 350
//       },
//       labels: [],
//       title: {
//         text: "Event Attendance Report"
//       },
//       legend: {
//         position: 'bottom'
//       },
//       dataLabels: {
//         enabled: true
//       }
//     };
//   }

//   ngOnInit(): void {
//     this.fetchEventAttendanceReport();
//   }

//   exportToPDF(): void {
//     const data = document.getElementById('reportTable');
//     if (data) {
//       html2canvas(data).then(canvas => {
//         const imgWidth = 208; // A4 width in mm
//         const pageHeight = 295; // A4 height in mm
//         const imgHeight = canvas.height * imgWidth / canvas.width;
//         const heightLeft = imgHeight;
//         const position = 0;

//         const pdf = new jsPDF('p', 'mm', 'a4');
//         pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
//         pdf.save('EventAttendanceReport.pdf');
//       });
//     }
//   }

//   fetchEventAttendanceReport(): void {
//   if (this.checkInId) { // Ensure checkInId is set
//     this.EventAttendanceService.getEventAttendanceReport(this.checkInId).subscribe(
//       (data: any[]) => {
//         this.eventAttendances = data;
//         this.updateChartOptions(data);
//       },
//       (error) => {
//         console.error('Error fetching event attendance report', error);
//         alert('Error fetching event attendance report: ' + error.message); 
//       }
//     );
//   } else {
//     console.error('checkInId is not set.');
//     alert('checkInId is not set.');
//   }
// }

//   updateChartOptions(data: any[]): void {
//     const labels = data.map(item => item.eventName);
//     const seriesData = data.map(item => item.attendanceCount);

//     this.chartOptions = {
//       ...this.chartOptions,
//       series: seriesData,
//       labels: labels
//     };
//   }
// }
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
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
import { ApexOptions } from 'apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  labels: string[]; // Make sure labels is always defined
};

@Component({
  selector: 'app-event-attendance-report',
  templateUrl: './event-attendance-report.component.html',
  styleUrls: ['./event-attendance-report.component.css']
})
export class EventAttendanceReportComponent implements OnInit {
  eventAttendances: any[] = [];
  public chartOptions: ChartOptions;
  checkInId: number = 1;

  constructor(private reportService: ReportService) {
    this.chartOptions = {
      series: [], // Initialize with empty array to avoid 'undefined'
      chart: {
        type: "pie",
        height: 350
      },
      labels: [], // Ensure labels are initialized
      title: {
        text: "Event Attendance Report"
      },
      dataLabels: {
        enabled: true
      },
      tooltip: {
        enabled: true,
        theme: 'dark'
      }
    };
  }

  ngOnInit(): void {
    this.fetchEventAttendanceReport();
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
      }).catch(error => {
        console.error('Error exporting to PDF', error);
        alert('Error exporting to PDF: ' + error.message);
      });
    } else {
      console.error('No element found with ID "reportTable"');
      alert('No element found with ID "reportTable".');
    }
  }

  fetchEventAttendanceReport(): void {
    if (this.checkInId) { // Ensure checkInId is set
      this.reportService.getEventAttendanceReport(this.checkInId).subscribe(
        (data: any[]) => {
          this.eventAttendances = data;
          this.updateChartOptions(data);
        },
        (error) => {
          console.error('Error fetching event attendance report', error);
          alert('Error fetching event attendance report: ' + error.message); 
        }
      );
    } else {
      console.error('checkInId is not set.');
      alert('checkInId is not set.');
    }
  }

  updateChartOptions(data: any[]): void {
    const labels = data.map(item => item.eventName);
    const seriesData = data.map(item => item.attendanceCount);

    this.chartOptions = {
      ...this.chartOptions,
      series: seriesData, // Ensure this is a valid format for Pie chart
      labels: labels || [] // Ensure labels is always defined
    };
  }
}

