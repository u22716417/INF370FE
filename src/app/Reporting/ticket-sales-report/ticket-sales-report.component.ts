import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-ticket-sales-report',
  templateUrl: './ticket-sales-report.component.html',
  styleUrls: ['./ticket-sales-report.component.css']
})
export class TicketSalesReportComponent implements OnInit {
  ticketSales: any[] = [];
  public chartOptions: Partial<ChartOptions> = {};

  constructor(private ticketSalesReportService: ReportService) {}

  ngOnInit(): void {
    this.fetchTicketSalesReport();
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

  fetchTicketSalesReport(): void {
    this.ticketSalesReportService.getTicketSalesReport().subscribe(
      (data: any[]) => {
        this.ticketSales = data;
        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
      }
    );
  }

  updateChartOptions(): void {
    const categories = this.ticketSales.map(sale => sale.event_name); // Modify according to your data structure
    const data = this.ticketSales.map(sale => sale.number_of_tickets_sold); // Modify according to your data structure

    this.chartOptions = {
      series: [{
        name: "Ticket Sales",
        data: data
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: categories
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Ticket Sales per Event",
        align: 'center'
      }
    };
  }
}
