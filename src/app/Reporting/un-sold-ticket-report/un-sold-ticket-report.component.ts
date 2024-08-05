import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-un-sold-ticket-report',
  templateUrl: './un-sold-ticket-report.component.html',
  styleUrls: ['./un-sold-ticket-report.component.css']
})
export class UnSoldTicketReportComponent {
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
    this.ticketSalesReportService.getUnSoldTicketSalesReport().subscribe(
      (data: any[]) => {
        this.ticketSales = data;
      },
      (error) => {
        console.error('Error fetching ticket sales report', error);
      }
    );
  }
}
