import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../report.service';
import { ChartComponent, ApexChart, ApexDataLabels, ApexTooltip, ApexLegend } from 'ng-apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
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
            return val ;
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
    const chartElement = document.getElementById('chart'); // Element for the chart
    const tableElement = document.getElementById('reportTable'); // Element for the table
    const date = new Date().toLocaleDateString();
    const generatedBy = this.reportGeneratedBy;

    if (chartElement && tableElement) {
        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add the logo image
        const logoImg = new Image();
        logoImg.src = 'assets/images/Protea-logo.png'; // Path to the image
        logoImg.onload = () => {
            // Add the logo image to the PDF
            pdf.addImage(logoImg, 'PNG', 105 - 15, 10, 30, 30); // Centered image at top

            // Add the title below the image
            pdf.setFontSize(18);
            pdf.text('Event Attendance Report', 105, 50, { align: 'center' });

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
                    startY: 80 + chartImgHeight, // Position to start the table after the chart
                    html: '#reportTable', // ID of the table element
                    useCss: true, // Optionally use styles from the HTML table
                    theme: 'striped', // Table theme, can be 'striped', 'grid', 'plain'
                    headStyles: { fillColor: [41, 128, 185] }, // Customize header style
                    styles: { cellPadding: 2, fontSize: 10 }, // Customize table cell styles
                    didDrawPage: (data) => {
                        // Add any additional content below the table
                        const additionalContent = document.getElementById('additionalContent');
                        if (additionalContent) {
                            pdf.setFontSize(12);
                            //pdf.text(additionalContent.textContent || '', 10, data.cursor.y + 10); // Position after the table
                        }
                    }
                });

                // Save the PDF
                pdf.save('EventAttendanceReport.pdf');
            }).catch(error => {
                console.error('Error generating chart canvas:', error);
            });
        };
    } else {
        console.error('Could not find chart or table element.');
    }
}

} 
