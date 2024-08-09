import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import {
  ChartComponent,
  ApexChart,
  ApexLegend,
  ApexDataLabels,
  ApexTooltip,
  ApexOptions,
  ApexPlotOptions,
  ApexGrid,
  ApexTheme,
  ApexYAxis,
  ApexXAxis,
  ApexAxisChartSeries
} from 'ng-apexcharts';
import { map } from 'rxjs/internal/operators/map';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export type eventAttendanceChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-event-attendance-report',
  templateUrl: './event-attendance-report.component.html',
  styleUrls: ['./event-attendance-report.component.css']
})
export class EventAttendanceReportComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public eventAttendanceChartOptions: Partial<eventAttendanceChartOptions>;
  attendanceRecords: any[] = [];
  constructor(private reportService: ReportService) {
    this.eventAttendanceChartOptions = {
      chart: {
        fontFamily: 'Rubik, sans-serif',
        height: 265,
        type: 'bar',
        toolbar: {
          show: false
        },
        stacked: false,
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 3,
        },
      },
      colors: ["#0d6efd"],
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      grid: {
        strokeDashArray: 3,
      },
      markers: {
        size: 3
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        theme: 'dark'
      },
      series: [
        {
          name: "Attendance Quantity",
          data: []
        }
      ]
    };
  }

  ngOnInit(): void {
    const eventId = 2; // Replace with the actual event ID you need

    this.reportService.getEventAttendanceReport(eventId).subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          const categories = data.map(record => record.attendanceDate || 'Unknown');
          const seriesData = data.map(record => record.attendanceQuantity || 0);

          this.eventAttendanceChartOptions = {
            ...this.eventAttendanceChartOptions,
            xaxis: {
              categories: categories
            },
            series: [
              {
                name: "Attendance Quantity",
                data: seriesData
              }
            ]
          };
        } else {
          console.error('Data is not in the expected format:', data);
        }
      },
      error: (err) => {
        console.error('Error fetching event attendance data:', err);
      }
    });
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
}
//   @ViewChild("chart") chart!: ChartComponent;
//   public attendancechartOptions: attendanceChartOptions;

//   constructor(private eventAttendanceService: ReportService) {
//     this.attendancechartOptions = {
//       series: [30, 25, 20, 15, 10], // Example data, replace with actual values
//       chart: {
//         type: 'pie',
//         height: 265,
//         fontFamily: 'Rubik, sans-serif',
//       },
//       labels: ['2020', '2021', '2022', '2023', '2024'], // Example labels
//       legend: {
//         show: true,
//         position: 'bottom'
//       },
//       dataLabels: {
//         enabled: true,
//         formatter: (val: number, opts: any) => {
//           return opts.w.config.labels[opts.seriesIndex] + ": " + val.toFixed(2) + "%"
//         }
//       },
//       colors: ["#0d6efd", "#009efb", "#6771dc", "#ffc107", "#dc3545"], // Example colors
//       tooltip: {
//         theme: 'dark',
//         y: {
//           formatter: (val: number) => {
//             return val + "%";
//           }
//         }
//       }
//     };
//   }

//   ngOnInit(): void {
//     // Additional logic for initialization if needed
//   }
// }

