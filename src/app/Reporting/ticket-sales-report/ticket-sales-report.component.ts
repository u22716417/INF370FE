import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ticket-sales-report',
  templateUrl: './ticket-sales-report.component.html',
  styleUrls: ['./ticket-sales-report.component.css']
})
export class TicketSalesReportComponent implements OnInit {
  ticketSales: any[] = [];

  constructor(private ticketSalesReportService: ReportService) { }

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
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
      }
    );
  }
}
