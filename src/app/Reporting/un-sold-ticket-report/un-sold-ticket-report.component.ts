import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';
import {
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexAxisChartSeries
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  yaxis?: any; // Add yaxis for labels
};

@Component({
  selector: 'app-un-sold-ticket-report',
  templateUrl: './un-sold-ticket-report.component.html',
  styleUrls: ['./un-sold-ticket-report.component.css']
})
export class UnSoldTicketReportComponent implements OnInit {
  ticketSales: any[] = [];
  public chartOptions: ChartOptions;

  constructor(private ticketSalesReportService: ReportService) {
    this.chartOptions = {
      series: [
        {
          name: "Unsold Tickets",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Events' // Label for x-axis
        }
      },
      yaxis: {
        title: {
          text: 'Number of Tickets' // Label for y-axis
        }
      },
      title: {
        text: "Unsold Ticket Sales Report"
      },
      fill: {
        opacity: 1
      }
    };
  }

  ngOnInit(): void {
    this.fetchTicketSalesReport();
  }

  onMonthChange(event: any): void {
    const selectedMonth = event.target.value;
    this.fetchTicketSalesReport(selectedMonth);
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
        pdf.save('TicketSalesReport.pdf');
      });
    }
  }

  fetchTicketSalesReport(month: string = ''): void {
    this.ticketSalesReportService.getUnsoldTicketsReport(month).subscribe(
      (data: any[]) => {
        this.ticketSales = data;
        this.updateChartOptions(data);
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
        alert('Error fetching ticket sales report: ' + error.message); 
      }
    );
  }

  updateChartOptions(data: any[]): void {
    const categories = data.map(item => item.eventName);
    const seriesData = data.map(item => item.unsoldTickets);

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: "Unsold Tickets",
          data: seriesData
        }
      ],
      xaxis: {
        categories: categories,
        title: {
          text: 'Events'
        }
      },
      yaxis: {
        title: {
          text: 'Number of Tickets'
        }
      }
    };
  }
}


