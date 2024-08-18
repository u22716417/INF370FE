import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
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
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import autoTable from 'jspdf-autotable';

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
  selector: 'app-customer-satisfaction-report',
  templateUrl: './customer-satisfaction-report.component.html',
  styleUrls: ['./customer-satisfaction-report.component.css']
})
export class CustomerSatisfactionReportComponent implements OnInit {

  customerSatisfaction: any[] = [];
  filteredCustomerSatisfaction: any[] = [];
  public chartOptions: Partial<ChartOptions> | any;
  reportGeneratedDate: string = '';
  reportGeneratedBy: string = ''; // New property to hold the user's name
  events: any[] = [];
  eventsfromDb: any[] = [];
  selectedEvent: string = '';


  constructor(
    private reportService: ReportService,
    private userManagementService: UserManagementService // Inject the service
  ) {}

  ngOnInit(): void {
    this.fetchCustomerSatisfactionReport();
    this.reportGeneratedDate = this.getCurrentDateAndTime();
    this.getCurrentUser(); // Fetch the current user
    this.events = [...this.getUniqueEventNames()];
  }

  getCurrentDateAndTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }

  onEventChange(event: any) {
    this.selectedEvent = event.target.value;
    this.filterCustomerSatisfaction();
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

  getUniqueEventNames(): string[] {
    const eventNames = this.eventsfromDb.map(event => event.eventName);
    return [...new Set(eventNames)];
  }

  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('reportTable'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'customerSatisfactionReport');
  
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'customer-satisfaction-report.xlsx');
  }

  fetchCustomerSatisfactionReport(): void {
    this.reportService.getCustomerSatisfactionReport().subscribe(
      (data: any[]) => {
        this.eventsfromDb = [...data];
        console.log(data);
        this.groupCustomerSatisfactionData(data);
        this.initializeChart();
      },
      (error) => {
        console.error('Error fetching customer satisfaction report', error);
      }
    );
  }

  groupCustomerSatisfactionData(data: any[]): void {
    const groupedData = data.reduce((acc, report) => {
      const eventName = report.eventName || 'Unknown Event';
      if (!acc[eventName]) {
        acc[eventName] = {
          eventName: eventName,
          ratingsCount: [0, 0, 0, 0, 0] // For ratings 1 to 5
        };
      }
      acc[eventName].ratingsCount[report.rating - 1] += 1; // Subtract 1 to index from 0
      return acc;
    }, {});

    this.customerSatisfaction = Object.values(groupedData);
    this.filteredCustomerSatisfaction = [...this.customerSatisfaction];
  }

  filterCustomerSatisfaction(): void {
    if (this.selectedEvent) {
      this.filteredCustomerSatisfaction = this.customerSatisfaction.filter(report => report.eventName === this.selectedEvent);
    } else {
      this.filteredCustomerSatisfaction = [...this.customerSatisfaction];
    }
    this.initializeChart();
  }

  initializeChart(): void {
    const categories = this.filteredCustomerSatisfaction.map(report => report.eventName);
  
    
    const colors = ["#FF0000", "#FFA500", "#FFD700", "#ADFF2F", "#008000"]; // Red, Orange, Gold, GreenYellow, Green
  
    const seriesData = [
      {
        name: "1 Star",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[0]),
        color: colors[0] // Red for 1 Star
      },
      {
        name: "2 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[1]),
        color: colors[1] // Orange for 2 Stars
      },
      {
        name: "3 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[2]),
        color: colors[2] // Gold for 3 Stars
      },
      {
        name: "4 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[3]),
        color: colors[3] // GreenYellow for 4 Stars
      },
      {
        name: "5 Stars",
        data: this.filteredCustomerSatisfaction.map(report => report.ratingsCount[4]),
        color: colors[4] // Green for 5 Stars
      }
    ];
  
    this.chartOptions = {
      series: seriesData,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      title: {
        text: "Customer Satisfaction Report"
      },
      xaxis: {
        categories: categories,
        title: {
          text: "Events"
        }
      },
      yaxis: {
        title: {
          text: "Number of Ratings"
        }
      },
      tooltip: {
        y: {
          formatter: function(val: number): string {
            return val.toString() + " ratings";
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      legend: {
        position: 'top'
      },
      fill: {
        opacity: 1
      }
    };
  }
  
  
  exportPDF(): void {
    const data = document.getElementById('reportContent'); // Capture the entire content
    if (data) {
      html2canvas(data).then((canvas: HTMLCanvasElement) => {
        const imgWidth = 208; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const position = 0;

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('CustomerSatisfactionReport.pdf');
      });
    } else {
      console.log('Report content element not found');
    }
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
            pdf.text('Customer Satisfaction Report', 105, 50, { align: 'center' });

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
                    styles: { cellPadding: 2, fontSize: 10 } // Customize table cell styles
                });

                // Add any additional content if necessary
                const additionalContent = document.getElementById('additionalContent');
                if (additionalContent) {
                    pdf.setFontSize(12);
                    //pdf.text(additionalContent.textContent || '', 10, autoTable());
                }

                // Save the PDF
                pdf.save('CustomerSatisfactionReport.pdf');
            }).catch(error => {
                console.error('Error generating chart canvas:', error);
            });
        };
    } else {
        console.log('Could not find chart or table element.');
    }
}
  
}
