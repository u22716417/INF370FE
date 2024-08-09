import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { ChartComponent, ApexChart, ApexDataLabels, ApexTooltip, ApexLegend } from 'ng-apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  constructor(private reportService: ReportService) {
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
    });
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
//     } else {
//       console.log('Table element not found'); // Debug log
//     }
//   }
// }
exportToPDF(): void {
  const chartElement = document.getElementById('chart');
  const tableElement = document.getElementById('reportTable');
  const date = new Date().toLocaleDateString();
  
  
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
     
      const chartImgData = chartCanvas.toDataURL('image/png');
      const chartWidth = 180; 
      const chartHeight = (chartCanvas.height * chartWidth) / chartCanvas.width;
      pdf.addImage(chartImgData, 'PNG', 15, 40, chartWidth, chartHeight);

     
      const tableImgData = tableCanvas.toDataURL('image/png');
      const tableYPosition = 40 + chartHeight + 10; 
      const tableWidth = 180; 
      const tableHeight = (tableCanvas.height * tableWidth) / tableCanvas.width;
      pdf.addImage(tableImgData, 'PNG', 15, tableYPosition, tableWidth, tableHeight);

      pdf.save('EventAttendanceReport.pdf');
    }).catch(error => {
      console.error('Error generating PDF', error);
      alert('Error generating PDF: ' + error.message);
    });
  }
}
}
